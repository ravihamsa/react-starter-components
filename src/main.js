/**
 * Created by ravi.hamsa on 6/22/16.
 */


import React, {Component, PropTypes} from "react";
import Child from './components/Child'
import NameList from './components/NameList'
import emptyFunction from 'fbjs/lib/emptyFunction';
import dataSourceConfigs from './requests';
import {dataLoader, SmartWrapper, SimpleStore} from './core';
import {Form, TextInput, Select} from './components/Form';
import List from './components/common/List';



for (let requestId in dataSourceConfigs) {
    dataLoader.addResource(requestId, dataSourceConfigs[requestId]);
}

const context = {
    insertCss: styles => styles._insertCss(),
    onSetTitle: value => (document.title = value),
}




class App extends Component {


    getChildContext() {
        const context = this.props.context;
        return {
            insertCss: context.insertCss || emptyFunction,
            onSetTitle: context.onSetTitle || emptyFunction,
        }
    }


    render() {

        var childSmartConfig = {
            dataRequests: [{
                propKey: 'items',
                requestId: 'nameList'
            }]
        }


        var selectSmartConfig = {
            dataRequests: [{
                propKey: 'options',
                requestId: 'nameList'
            }]
        }


        return <div>This is React App <br/>
            <SmartWrapper {...childSmartConfig}>
                <List></List>
            </SmartWrapper>


            test

            <div className="container">
                <Form>
                    <TextInput name="something" defaultValue="Ravi Hamsa"/>
                    <SmartWrapper {...selectSmartConfig}>
                        <Select  name="otherthing" label="Enter Other thing" placeholder="This is placeholder" defaultValue={'2'}/>
                    </SmartWrapper>

                </Form>
            </div>

            <div className="container">
                <Form>
                    <div>
                        <span>
                            <TextInput name="otherthing2" label="Enter Other thing" placeholder="This is placeholder" helperText="We will never share your email with anyone else."/>
                        </span>
                    </div>
                </Form>
            </div>

            <Child view="create" text="My React App"/>
        </div>
    }


}

App.childContextTypes = {
    insertCss: PropTypes.func.isRequired,
    onSetTitle: PropTypes.func.isRequired
}

window.App = App;
window.appContext = context;

export default App;