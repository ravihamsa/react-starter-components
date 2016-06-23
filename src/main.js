/**
 * Created by ravi.hamsa on 6/22/16.
 */


import React, {Component, PropTypes} from "react";
import Child from './components/Child/Child'
import emptyFunction from 'fbjs/lib/emptyFunction';

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
        return <div>This is React App <br/><Child view="create" text="My React App"/></div>
    }


}

App.childContextTypes = {
    insertCss: PropTypes.func.isRequired,
    onSetTitle: PropTypes.func.isRequired
}

window.App = App;
window.appContext = context;

export default App;