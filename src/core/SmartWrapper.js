/**
 * Created by ravi.hamsa on 6/28/16.
 */

import React, {Component} from "react";
import dataLoader from './dataLoader';
import Loader from './Loader';
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
        let stores = this.props.dataRequests;
        if (stores) {
            for (let i = 0; i < stores.length; i++) {
                let storeConfig = stores[i];
                let getParams = storeConfig.getDataParams || identity;
                this.addRequest(storeConfig.propKey, storeConfig.requestId, getParams.call(this, storeConfig))
                // this.loadStore(storeConfig.propKey, storeConfig.store, getParams.call(this, storeConfig), true)
            }
        }

        if (this.props.activeRules) {
            let activeRules = this.props.activeRules, active = true;
            for (var i=0; i<activeRules.length;i++) {
                active = this.evaluateActiveRule(activeRules[i]);
                if (!active) {
                    break;
                }
            }
            this.setState({active: active});
        }

    }

    evaluateActiveRule(rule) {
        let stateValue = this.props[rule.prop];
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
        let def = dataLoader.getRequestDef(requestId, payload);

        def.done(function (data) {
            self.dataIndex[propName] = data;
        })

        def.finally(function () {
            self.bumpAndCheckLoading(-1)
        })

        def.catch(function (e) {
            console.log(e);
        })

        self.bumpAndCheckLoading(1)
    }


    bumpAndCheckLoading(diff) {
        this._loadingCount += diff;
        this.setState({loading: this._loadingCount > 0})
    }

    render() {
        return this.state.active ?
            this.state.loading ? <Loader/> : React.cloneElement(this.props.children, {...this.dataIndex}) : null
    }

}

export default SmartWrapper;