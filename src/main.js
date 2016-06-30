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
import {List, FormCollection} from './components/common';




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



            <div className="container">
                <Form>
                    <TextInput name="something" defaultValue="default value from attribute"/>
                    <SmartWrapper {...selectSmartConfig}>
                        <Select  name="otherthing" label="Enter Other thing" placeholder="This is placeholder" defaultValue={'2'}/>
                    </SmartWrapper>

                </Form>
            </div>

            <div className="container">
                <Form valueStore={new SimpleStore({otherthing2:'default value from value store'})}>
                    <div>
                        <span>
                            <TextInput name="otherthing2" label="Enter Other thing -- 2" placeholder="This is placeholder" helperText="We will never share your email with anyone else."/>
                        </span>
                    </div>
                </Form>
            </div>


            <div className="container">
                <FormCollection items={[{uname:'ravi', password:'kavi'},{uname:'kavi', password:'ravi'}]}>
                    <Form>
                        <h1>Title</h1>
                        <TextInput name="uname" defaultValue=""/>
                        <TextInput type="password" name="password" defaultValue=""/>
                    </Form>
                </FormCollection>
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