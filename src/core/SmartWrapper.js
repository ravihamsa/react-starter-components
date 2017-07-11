/**
 * Created by ravi.hamsa on 6/28/16.
 */

import React, {Component} from "react";
import dataLoader from './dataLoader';
import Loader from './Loader';
import MessageStack from './MessageStack';
import {identity,_} from './utils';

const NATIVE_PROPS=['children', 'dataRequests', 'onDataUpdate', 'activeRules']

class SmartWrapper extends Component {

    constructor() {
        super(...arguments);
        this._loadingCount = 0;
        this._pendingRequests = [];
        this.isInDom = false;
        this.dataIndex = {};
        this.state = {
            loading: false,
            active: true
        }
    }

    componentWillMount() {
        if (this.checkActiveRules(this.props)) {
            let stores = this.props.dataRequests;
            if (stores) {
                for (let i = 0; i < stores.length; i++) {
                    let storeConfig = stores[i];
                    let filteredProps = _.omit(this.props, NATIVE_PROPS);
                    this.addRequestIfValid(storeConfig.propKey, storeConfig.requestId, filteredProps, storeConfig)

                }
            }
        }
        this.isInDom = true;
    }

    componentWillUnmount(){
        this.isInDom = false;
    }

    componentWillReceiveProps(newProps) {
        let prevProps = this.props;
        if (this.checkActiveRules(newProps, prevProps)) {
            this.checkPropDependencies(newProps, prevProps);
        }
    }



    checkPropDependencies(newProps, prevProps) {
        let stores = newProps.dataRequests;
        let self = this;
        if (stores) {
            for (let i = 0; i < stores.length; i++) {
                let storeConfig = stores[i];
                let propDependency = storeConfig.propDependency
                if (propDependency !== undefined) {
                    let newPropValue = newProps[propDependency];
                    let oldPropValue = prevProps[propDependency];
                    if (newPropValue !== oldPropValue) {
                        let filteredProps = _.omit(newProps, NATIVE_PROPS)
                        self.addRequestIfValid(storeConfig.propKey, storeConfig.requestId, filteredProps, storeConfig)
                    }
                }


                let propDependencies = storeConfig.propDependencies;
                if(propDependencies !== undefined && propDependencies.length !== undefined && propDependencies.length > 0){
                    _.each(propDependencies, (propDependency)=>{
                        let newPropValue = newProps[propDependency];
                        let oldPropValue = prevProps[propDependency];
                        if (newPropValue !== oldPropValue) {
                            let filteredProps = _.omit(newProps, NATIVE_PROPS)
                            self.addRequestIfValid(storeConfig.propKey, storeConfig.requestId, filteredProps, storeConfig)
                        }
                    })
                }
                // this.loadStore(storeConfig.propKey, storeConfig.store, getParams.call(this, storeConfig), true)
            }
        }

    }


    checkActiveRules(props) {
        let activeRules = props.activeRules, active = true;
        if (props.activeRules) {
            for (var i = 0; i < activeRules.length; i++) {
                active = this.evaluateActiveRule(activeRules[i], props);
                if (!active) {
                    break;
                }
            }
            this.setState({active: active});
        }
        return active;
    }

    evaluateActiveRule(rule, props) {
        let stateValue = props[rule.prop];
        let ruleValue = rule.value;
        switch (rule.expr) {
            case 'equal':
                return stateValue === ruleValue;
                break;
            case 'notEqual':
                return stateValue !== ruleValue;
                break;
            case 'true':
                return stateValue === true;
                break;
            case 'false':
                return stateValue === false;
                break;
            case 'defined':
                return (stateValue !== undefined) && stateValue !== null;
                break;
            default:
                return true;
                break;
        }
    }

    getRequestDef(requestId, payload){
        return dataLoader.getRequestDef(requestId, payload);
    }

    _addRequest(requestId, payload, handlers, onProgress) {
        let self = this;
        let def = dataLoader.getRequestDef(requestId, payload, onProgress);
        def.done(self.wrapCallBack(handlers.done))
        def.catch(self.wrapCallBack(handlers.catch))
        def.finally(self.wrapCallBack(function () {
            self.bumpAndCheckLoading(-1)
        }))
        self.bumpAndCheckLoading(1)
        return def;
    }

    wrapCallBack(fn){
        if(!fn){
            return identity;
        }
        let self = this;
        return function(){
            if(self.isInDom){
                fn.apply(null, arguments)
            }
        }
    }

    addRequestIfValid(propName, requestId, filteredProps, storeConfig){
        let self = this;
        let isRequestValid = storeConfig.validateRequest !== undefined ? storeConfig.validateRequest(filteredProps) : true;
        let getParams = storeConfig.getParams;
        if(isRequestValid){
            let params = getParams ? getParams.call(self, filteredProps) : filteredProps
            this.addRequest(propName, requestId, params)
        }else{
            let fallbackResponse = storeConfig.staticFallback  !== undefined  ? storeConfig.staticFallback(filteredProps) : {data:[]};
            let def =  dataLoader.getStaticPromise(fallbackResponse);
            def.done((data)=>this.dataIndex[propName] = data)
            def.catch((error)=>this.dataIndex['errors'] = error)
            def.finally(self.wrapCallBack(function () {
                self.bumpAndCheckLoading(-1)
            }))
            self.bumpAndCheckLoading(1)
            return def;
        }
    }

    addDummyRequest(propName, requestId, payload, storeConfig){
        delete this.dataIndex.errors;
        return this._addRequest(requestId, payload, {
            done: (data)=>this.dataIndex[propName] = data,
            catch: (error)=>this.dataIndex['errors'] = error
        })
    }

    addRequest(propName, requestId, payload, onProgress) {
        delete this.dataIndex.errors;
        return this._addRequest(requestId, payload, {
            done: (data)=>this.dataIndex[propName] = data,
            catch: (error)=>this.dataIndex['errors'] = error
        },onProgress)
    }

    addStateRequest(stateName, requestId, payload, defaultValue) {
        if(defaultValue === undefined){
            defaultValue = null
        }
        this.setState({[stateName]:defaultValue})
        return this._addRequest(requestId, payload, {
            done: (data)=>this.setState({[stateName]:data}),
            catch: (error)=>this.setState({[stateName]:defaultValue,[`${stateName}Error`]:error})
        })
    }


    bumpAndCheckLoading(diff) {
        this._loadingCount += diff;
        let loadingDone = this._loadingCount === 0;
        if (loadingDone) {
            if (this.props.onDataUpdate) {
                this.props.onDataUpdate(this.dataIndex);
            }
        }
        this.setState({loading: this._loadingCount > 0})
    }

    renderLoading() {
        return <Loader/>
    }

    renderErrors() {
        return <MessageStack messages={this.dataIndex.errors}/>
    }

    renderChildren() {
        return React.cloneElement(this.props.children, {...this.dataIndex, addRequest: this.addRequest.bind(this)})
    }

    render() {
        if (this.state.active) {
            if (this.state.loading) {
                return this.renderLoading()
            } else if (this.dataIndex.errors && this.props.showError !== false) {
                return this.renderErrors()
            } else {
                if(this.props.showIf === false){
                    return null
                }else{
                    return this.renderChildren()
                }
            }
        } else {
            return <div></div>;
        }

    }

}

export class NoLoadingSmartWrapper extends SmartWrapper {
    render(){
        return this.renderChildren();
    }
}

export default SmartWrapper;
