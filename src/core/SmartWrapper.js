/**
 * Created by ravi.hamsa on 6/28/16.
 */

import React, {Component} from 'react';
import dataLoader from './dataLoader';
import Loader from './Loader';
import MessageStack from './MessageStack';
import {identity, _} from './utils';
import utils from './utils';
const {cloneChildren} = utils;


const NATIVE_PROPS = ['children', 'dataRequests', 'onDataUpdate', 'activeRules'];

class SmartWrapper extends Component {

    constructor() {
        super(...arguments);
        this._loadingCount = 0;
        this.isInDom = false;
        this.renderedOnce = false;
        this.dataIndex = {};
        this.state = {
            loading: false,
            active: true
        };
    }

    componentWillMount() {
        if (this.checkActiveRules(this.props)) {
            const stores = this.props.dataRequests;
            if (stores) {
                for (let i = 0; i < stores.length; i++) {
                    const storeConfig = stores[i];
                    const filteredProps = _.omit(this.props, NATIVE_PROPS);
                    this.addRequestIfValid(storeConfig.propKey, storeConfig.requestId, filteredProps, storeConfig);

                }
            }
        }
        this.isInDom = true;
    }

    componentWillUnmount() {
        this.isInDom = false;
    }

    componentWillReceiveProps(newProps) {
        const prevProps = this.props;
        if (this.checkActiveRules(newProps, prevProps)) {
            this.checkPropDependencies(newProps, prevProps);
        }
    }


    checkPropDependencies(newProps, prevProps) {
        const stores = newProps.dataRequests;
        const self = this;
        if (stores) {
            for (let i = 0; i < stores.length; i++) {
                const storeConfig = stores[i];
                const propDependency = storeConfig.propDependency;
                if (propDependency !== undefined) {
                    const newPropValue = newProps[propDependency];
                    const oldPropValue = prevProps[propDependency];
                    if (newPropValue !== oldPropValue) {
                        const filteredProps = _.omit(newProps, NATIVE_PROPS);
                        self.addRequestIfValid(storeConfig.propKey, storeConfig.requestId, filteredProps, storeConfig);
                    }
                }


                const propDependencies = storeConfig.propDependencies;
                if (propDependencies !== undefined && propDependencies.length !== undefined && propDependencies.length > 0) {
                    _.each(propDependencies, propDependency => {
                        const newPropValue = newProps[propDependency];
                        const oldPropValue = prevProps[propDependency];
                        if (newPropValue !== oldPropValue) {
                            const filteredProps = _.omit(newProps, NATIVE_PROPS);
                            self.addRequestIfValid(storeConfig.propKey, storeConfig.requestId, filteredProps, storeConfig);
                        }
                    });
                }
                // this.loadStore(storeConfig.propKey, storeConfig.store, getParams.call(this, storeConfig), true)
            }
        }

    }


    checkActiveRules(props) {
        let activeRules = props.activeRules,
                active = true;
        if (props.activeRules) {
            for (let i = 0; i < activeRules.length; i++) {
                active = this.evaluateActiveRule(activeRules[i], props);
                if (!active) {
                    break;
                }
            }
            this.setState({
                active
            });
        }
        return active;
    }

    evaluateActiveRule(rule, props) {
        const stateValue = props[rule.prop];
        const ruleValue = rule.value;
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

    getRequestDef(requestId, payload) {
        return dataLoader.getRequestDef(requestId, payload);
    }

    _addRequest(requestId, payload, handlers, onProgress) {
        const self = this;
        const def = dataLoader.getRequestDef(requestId, payload, onProgress);
        def.done(self.wrapCallBack(handlers.done));
        def.catch(self.wrapCallBack(handlers.catch));
        def.finally(self.wrapCallBack(() => {
            self.bumpAndCheckLoading(-1);
        }));
        self.bumpAndCheckLoading(1);
        return def;
    }

    wrapCallBack(fn) {
        if (!fn) {
            return identity;
        }
        const self = this;
        return function() {
            if (self.isInDom) {
                fn.apply(null, arguments);
            }
        };
    }

    _updateDataIndex(propName, data) {
        let propNames = propName;
        if (!_.isArray(propNames)) {
            propNames = [propNames];
        }

        for (const index in propNames) {
            const key = propNames[index];
            this.dataIndex[key] = data[key] !== undefined ? data[key] : data;
        }
    }

    addRequestIfValid(propName, requestId, filteredProps, storeConfig) {
        const self = this;
        const isRequestValid = storeConfig.validateRequest !== undefined ? storeConfig.validateRequest(filteredProps) : true;
        const getParams = storeConfig.getParams;
        if (isRequestValid) {
            const params = getParams ? getParams.call(self, filteredProps) : filteredProps;
            this.addRequestWithController({
                propName, requestId, params, storeConfig
            });
        } else {
            const fallbackResponse = storeConfig.staticFallback !== undefined ? storeConfig.staticFallback(filteredProps) : {
                data: []
            };
            const def = dataLoader.getStaticPromise(fallbackResponse);
            def.done(data => this.dataIndex[propName] = data);
            def.catch(error => this.dataIndex['errors'] = error);
            def.finally(self.wrapCallBack(() => {
                self.bumpAndCheckLoading(-1);
            }));
            self.bumpAndCheckLoading(1);
            return def;
        }
    }

    addDummyRequest(propName, requestId, payload, storeConfig) {
        delete this.dataIndex.errors;
        return this._addRequest(requestId, payload, {
            done: data => this._updateDataIndex(propName, data),
            catch: error => this.dataIndex['errors'] = error
        });
    }

    addRequestWithController(config) {
        const {propName, requestId, params, storeConfig} = config;
        const {controller, controllerKey} = storeConfig;
        if (controller && controllerKey) {
            controller.clear(controllerKey);
            return this._addRequest(requestId, params, {
                done: data => {
                    controller.set(controllerKey, data);
                },
                catch: error => {
                    controller.setError(controllerKey, error);
                }
            });
        } else {
            delete this.dataIndex.errors;
            return this._addRequest(requestId, params, {
                done: data => {
		    if(storeConfig.orderBy) {
                        data = _.orderBy(data, [storeConfig.orderBy], [storeConfig.orderType || 'asc']);
                        this._updateDataIndex(propName, data);
                    } else {
                        this._updateDataIndex(propName, data);
                    }
                },
                catch: error => {
                    this.dataIndex['errors'] = error;
                }
            });
        }

    }

    addRequest(propName, requestId, payload, onProgress) {
        delete this.dataIndex.errors;
        return this._addRequest(requestId, payload, {
            done: data => this._updateDataIndex(propName, data),
            catch: error => this.dataIndex['errors'] = error
        }, onProgress);
    }

    addStateRequest(stateName, requestId, payload, defaultValue) {
        if (defaultValue === undefined) {
            defaultValue = null;
        }
        this.setState({
            [stateName]: defaultValue
        });
        return this._addRequest(requestId, payload, {
            done: data => this.setState({
                [stateName]: data
            }),
            catch: error => this.setState({
                [stateName]: defaultValue, [`${stateName}Error`]: error
            })
        });
    }


    bumpAndCheckLoading(diff) {
        this._loadingCount += diff;
        const loadingDone = this._loadingCount === 0;
        if (loadingDone) {
            if (this.props.onDataUpdate) {
                this.props.onDataUpdate(this.dataIndex);
            }
        }
        this.setState({
            loading: this._loadingCount > 0
        });
    }

    renderLoading() {
        return <Loader/>;
    }

    renderErrors() {
        return <MessageStack messages={this.dataIndex.errors}/>;
    }

    renderChildren() {
	    const proxyObj = {};
        if (this.props.proxyProps){
            const propsToProps = this.props.proxyProps.split(',');
            _.each(propsToProps, propKey => {
                proxyObj[propKey] = this.props[propKey];
            });
        }
        this.renderedOnce = true;
        return cloneChildren(this.props.children, {
            ...this.dataIndex,
            ...proxyObj
        });
    }

    render() {
        if (this.state.active) {
            if (this.state.loading) {
                return this.renderLoading();
            } else if (this.dataIndex.errors && this.props.showError !== false) {
                return this.renderErrors();
            } else {
	            return this.renderChildren();
            }
        } else {
            return <div></div>;
        }

    }

}

export class SmartWrapperV2 extends SmartWrapper {
    render() {
        if (this.state.active) {
            if (this.renderedOnce) {
	            return <div className={this.props.className || 'smart-wrapper'}>
		            {this.state.loading ? this.renderLoading() : null}
		            {this.renderChildren()}
	            </div>;
            } else {
	            if (this.state.loading) {
		            return this.renderLoading();
	            } else if (this.dataIndex.errors && this.props.showError !== false) {
		            return this.renderErrors();
	            } else {
		            return this.renderChildren();
	            }
            }

        } else {
            return <div></div>;
        }

    }
}

export class NoLoadingSmartWrapper extends SmartWrapper {
    render() {
        return this.renderChildren();
    }
}


export class ControllerWrapper extends SmartWrapper {

    renderErrors(errors) {
        return <MessageStack messages={errors}/>;
    }

    render() {
        const pendingRequests = _.filter(this.props.dataRequests, item => !item.controller.hasKey(item.controllerKey) && !item.controller.hasErrorKey(item.controllerKey));

        const errors = _.map(_.filter(this.props.dataRequests, item => item.controller.hasErrorKey(item.controllerKey)), item => item.controller.getError(item.controllerKey));

        if (pendingRequests.length > 0) {
            return this.renderLoading();
        } else {
            if (errors.length > 0) {
                return this.renderErrors(errors);
            } else {
                return this.renderChildren();
            }

        }
    }
}

export default SmartWrapper;
