/**
 * Created by ravi.hamsa on 3/26/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getDomProps} from '../../core/utils';
import {Map} from 'immutable';


export class Collector extends Component {
    constructor(props) {
        super(props);
        this.model = new Map();
        this.dirtyIndex = {};
    }

    afterUpdate(key, value, isDirty, prevFullObject) {
        const fullObject = this.model.toJSON();
        const {controller, onValueChange, name} = this.props;
        if (controller) {
            controller.set(name, fullObject);
        }
        if (onValueChange) {
            onValueChange({
                [key]: value
            }, fullObject, prevFullObject, isDirty);
        }
    }

    updateValue(key, value) {
    	const prevFullObject = this.model.toJSON();
        this.model = this.model.set(key, value);
        this.afterUpdate(key, value, this.dirtyIndex[key] === true, prevFullObject);
	    this.dirtyIndex[key] = true;
    }

    mutedUpdateValue(key, value) {
        this.model = this.model.set(key, value);
    }

    receiveEvent(eventName, arg1, arg2, arg3) {
        const {onEvent} = this.props;
        if (onEvent) {
            onEvent(eventName, arg1, arg2, arg3);
        }
    }

    getChildContext() {
        return {
            collector: this
        };
    }

    render() {
        return this.props.children;
    }
}

Collector.propTypes = {
    name: PropTypes.string.isRequired,
    controller: PropTypes.object,
    onValueChange: PropTypes.func,
};

Collector.childContextTypes = {
    collector: PropTypes.object
};

export default class SimpleForm extends Collector {


    filterDomProps(props) {
        return getDomProps(props);
    }

    getClassNames() {
        const {className = '', name} = this.props;
        const classes = [className, 'simple-form'];
        classes.push(`form-${name}`);
        return classes.join(' ');
    }

    render() {
        const props = this.filterDomProps(this.props);
        props.className = this.getClassNames();
        return <div {...props}>
            {this.props.children}
        </div>;
    }
}

