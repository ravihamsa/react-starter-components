/**
 * Created by ravi.hamsa on 6/28/16.
 */

import React, {Component} from "react";
import dataLoader from './dataLoader';
import Loader from './Loader';
import MessageStack from './MessageStack';
import {identity} from './utils';

class SmartWrapper extends Component {

    constructor() {
        super(...arguments);
        this._loadingCount = 0;
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
                    let getParams = storeConfig.getParams;
                    let params = getParams ? getParams.call(this, this.props) : this.props
                    this.addRequest(storeConfig.propKey, storeConfig.requestId, params)
                    // this.loadStore(storeConfig.propKey, storeConfig.store, getParams.call(this, storeConfig), true)
                }
            }
        }
    }

    componentWillReceiveProps(newProps) {
        let prevProps = this.props;
        if (this.checkActiveRules(newProps, prevProps)) {
            this.checkPropDependencies(newProps, prevProps);
        }
    }

    checkPropDependencies(newProps, prevProps) {
        let stores = newProps.dataRequests;
        if (stores) {
            for (let i = 0; i < stores.length; i++) {
                let storeConfig = stores[i];
                if (storeConfig.propDependency !== undefined) {
                    let getParams = storeConfig.getParams;
                    let newPropValue = newProps[storeConfig.propDependency];
                    let oldPropValue = prevProps[storeConfig.propDependency];
                    if (newPropValue && newPropValue !== oldPropValue) {
                        let params = getParams ? getParams.call(this, newProps) : newProps
                        this.addRequest(storeConfig.propKey, storeConfig.requestId, params)
                    }
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
            default:
                return true;
                break;
        }
    }

    addRequest(propName, requestId, payload) {
        var self = this;
        delete this.dataIndex.errors;
        let def = dataLoader.getRequestDef(requestId, payload);

        def.done(function (data) {
            self.dataIndex[propName] = data;
        })

        def.catch(function (e) {
            self.dataIndex['errors'] = e;
        })

        def.finally(function () {
            self.bumpAndCheckLoading(-1)
        })

        self.bumpAndCheckLoading(1)

        return def;
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

    render() {
        if (this.state.active) {
            if (this.state.loading) {
                return <Loader/>
            } else if(this.dataIndex.errors && this.props.showError !== false){
                return <MessageStack messages={this.dataIndex.errors}/>
            }else{
                return React.cloneElement(this.props.children, {...this.dataIndex, addRequest:this.addRequest.bind(this)} )
            }
        } else {
            return <div></div>;
        }

    }

}

export default SmartWrapper;