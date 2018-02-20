/**
 * Created by ravi.hamsa on 3/26/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getDomProps} from '../../core/utils';


export class CollectorChild extends Component {
    updateValue(value){
        this.context.collector.updateValue(this.props.name, value);
    }

    mutedUpdateValue(value){
        this.context.collector.mutedUpdateValue(this.props.name, value);
    }

    sendEvent(eventName, arg1, arg2, arg3){
        this.context.collector.receiveEvent(eventName, arg1, arg2, arg3);
    }
}

export default class SimpleElement extends CollectorChild {

    getClassNames(){
        const {className = '', name, type} = this.props;
        const classes = [className, 'simple-element'];
        classes.push(`element-${name}`);
        classes.push(`element-type-${type}`);
        return classes.join(' ');
    }

    onChange(event) {
        this.updateValue(event.target.value);
    }

    componentWillMount(){
        this.applyValue(this.props.value);
    }

    applyValue(value){
        if (value !== undefined){
            this.updateValue(value);
        }
    }

    filterDomProps(props) {
        const filteredProps = getDomProps(props);
        const onChangeHandler = filteredProps.onChange;
        if (onChangeHandler !== undefined) {
            filteredProps.onChange = event => {
                this.onChange(event);
                onChangeHandler(event);
            };
        } else {
            filteredProps.onChange = event => {
                this.onChange(event);
            };
        }
        return filteredProps;
    }

    render() {
	    const props = this.filterDomProps(this.props);
	    props.className = 'form-control';
	    const className = this.getClassNames();
	    if (props.type === 'hidden'){
	        return <input {...props}/>;
        }
        return <div className={className}>
	        <input {...props}/>
        </div> ;
    }
}

CollectorChild.contextTypes = {
    collector: PropTypes.object.isRequired
};

SimpleElement.propTypes = {
    name: PropTypes.string.isRequired
};

SimpleElement.defaultProps = {
    type: 'text',
    placehodler: 'Enter Text',
    disabled: false
};