/**
 * Created by ravi.hamsa on 6/28/16.
 */

import React from 'react';
import has from 'lodash/has';
import map from 'lodash/map';
import each from 'lodash/each';
import filter from 'lodash/filter';
import pick from 'lodash/pick';
import difference from 'lodash/difference';
import omit from 'lodash/omit';
import extend from 'lodash/extend';
import flatten from 'lodash/flatten';
import defaults from 'lodash/defaults';
import values from 'lodash/values';
import find from 'lodash/find';
import reduce from 'lodash/reduce';
import keys from 'lodash/keys';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import groupBy from 'lodash/groupBy';
import trim from 'lodash/trim';
import clone from 'lodash/clone';
import indexOf from 'lodash/indexOf';
const identity = function(arg1){
    return arg1;
};
export const _  = {
    has,
    map,
    isEmpty,
    reduce,
    groupBy,
    each,
    filter,
    pick,
    omit,
    extend,
    defaults,
    flatten,
    find,
    keys,
    debounce,
    identity,
    isArray,
    values,
    trim,
    clone,
    difference,
	indexOf
};



const getUniqueId = (function(){
    let counter = 1000;
    return function(){
        return '' + (++counter);
    };
}());



const connectToStore = function(Component, stores){
    class ComponentWrapper extends React.Component {
        constructor(props){
            super(props);
            this.state = {};
        }
        componentWillMount(){
            const self = this;
            this.unsubscribeStore = [];
            _.each(stores, item => {
                const {stateName, event = 'change', store, parser = identity} =  item;
                this.unsubscribeStore.push(store.on(event, args => {
                    self.setState({
                        stateName:parser(args)
                    });
                }));
            });
        }

        componentWillUnmount(){
            if (this.unsubscribeStore){
                _.each(this.unsubscribeStore, unsubscribe => unsubscribe());
            }
        }

        render(){
            return <Component {...this.props} {...this.state} />;
        }
    }
    return ComponentWrapper;
};

const cloneChildren = function(children, props){
    if (!children){
        return null;
    }
    if (children.map){
        return children.map((child, index) => {
            let key = props.key;
            if (key === undefined){
                key = index;
            }
            return React.cloneElement(child, {
                ...props, key
            });
        });
    } else {
        return  React.cloneElement(children, {
            ...props
        });
    }
};

const domProps = 'abbr accept acceptCharset accessKey action allowFullScreen allowTransparency alt async autoComplete autoFocus autoPlay cellPadding cellSpacing challenge charset checked cite class className cols colSpan command content contentEditable contextMenu controls coords crossOrigin data dateTime default defer dir disabled download draggable dropzone encType for form formAction formEncType formMethod formNoValidate formTarget frameBorder headers height hidden high href hrefLang htmlFor httpEquiv icon id inputMode isMap itemId itemProp itemRef itemScope itemType kind label lang list loop manifest max maxLength media mediaGroup method min minLength multiple muted name noValidate open optimum pattern ping placeholder poster preload radioGroup readOnly rel required role rows rowSpan sandbox scope scoped scrolling seamless selected shape size sizes sortable span spellCheck src srcDoc srcSet start step style tabIndex target title translate type typeMustMatch useMap value width wmode wrap onCopy onCut onPaste onLoad onError onWheel onScroll onCompositionEnd onCompositionStart onCompositionUpdate onKeyDown onKeyPress onKeyUp onFocus onBlur onChange onInput onSubmit onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp onSelect onTouchCancel onTouchEnd onTouchMove onTouchStart onAnimationStart onAnimationEnd onAnimationIteration onTransitionEnd'.split(' ');
export const getDomProps =  props => {
    const filteredProps = {};
    for (const prop in props) {
        if (domProps.indexOf(prop) > -1) {
            filteredProps[prop] = props[prop];
        }
    }
    return filteredProps;
};

const starterConfig = {
    dateFormat:'DD/MM/YYYY'
}
const setStarterConfig = (key, value) => {
	starterConfig[key] = value;
}

const getStarterConfig = key => starterConfig[key];


export default {
    identity, cloneChildren, connectToStore, getUniqueId, setStarterConfig, getStarterConfig
};