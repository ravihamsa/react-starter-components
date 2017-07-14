/**
 * Created by ravi.hamsa on 3/26/17.
 */
import React, {PropTypes, Component} from 'react';
import {Rx} from '../../core/rxutils';

const ensurePropertyIndex = (obj, prop) => {
    obj[prop] = obj[prop] || {};
};

export default class RXForm extends Component {
    constructor(props) {
        super(props);
        this.elementProps$ = new Rx.Subject();
        this.elementValue$ = new Rx.Subject();
        this.communication$ = new Rx.Subject();
        this.unmount$ = new Rx.Subject();
        this.elementPropIndex = {};
        this.valueIndex = {};
    }

    componentWillMount() {
        const read$ = this.elementValue$.filter(e => e.type === 'read');
        const update$ = this.elementValue$.filter(e => e.type === 'update');
        const selection$ = this.elementValue$.filter(e => e.type === 'selection');
        const name$ = this.elementValue$.filter(e => e.type === 'name');
        const register$ = this.elementProps$.filter(e => e.type === 'register');
        const clear$ = this.elementProps$.filter(e => e.type === 'clear');
        const other$ = this.elementProps$.filter(e => e.type !== 'register' && e.type !== 'clear');
        const shadowValue$ = this.elementProps$.filter(e => e.type !== '__shadowValue');
        //&& e.type !== '__shadowValue'

        register$.takeUntil(this.unmount$).subscribe(val => {
            ensurePropertyIndex(this.elementPropIndex, val.field);
        });

        other$.merge(shadowValue$).takeUntil(this.unmount$).subscribe(val => {
            ensurePropertyIndex(this.elementPropIndex[val.field], val.type);
            this.elementPropIndex[val.field][val.type] = val.value;
        });

        read$.merge(update$, selection$, name$).takeUntil(this.unmount$).subscribe(val => {
            this.valueIndex[val.field] = val.value;
        });


        update$.takeUntil(this.unmount$).subscribe(val => {
            this.valueChangeHandler({
                [val.field]: val.value
            }, this.valueIndex);
        });

        other$.takeUntil(this.unmount$).subscribe(val => {
            this.propChangeHandler(val);
        });

        clear$.takeUntil(this.unmount$).subscribe(val => {
            delete this.valueIndex[val.field];
            delete this.elementPropIndex[val.field];
            this.valueChangeHandler({
                [val.field]: val.value
            }, this.valueIndex);
        });
        // selection$.subscribe(e => console.log(e))
    }

    componentWillUnmount(){
        this.unmount$.next();
    }

    propChangeHandler(changed) {
        // console.log(changed, fullObject);
        if (this.props.onPropChange) {
            this.props.onPropChange(changed);
        }
    }

    valueChangeHandler(changed, fullObject) {
        // console.log(changed, fullObject);
        if (this.props.onValueChange) {
            this.props.onValueChange(changed, fullObject);
        }
    }

    getChildContext() {
        return {
            elementProps$: this.elementProps$,
            elementValue$: this.elementValue$,
            communication$: this.communication$,
            elementPropIndex: this.elementPropIndex,
            elementValueIndex: this.valueIndex,
        };
    }

    getValueObject() {
        const valueObj = {};
        const errors = [];
        for (const elementName  in this.elementPropIndex) {
            const propObject = this.elementPropIndex[elementName];
            if (propObject.active) {
                this.communication$.next({
                    field: elementName, type: 'validate', value: this.valueIndex[elementName]
                });
                if (propObject.valid && propObject.serverValid) {
                    valueObj[elementName] = this.valueIndex[elementName];
                    if (propObject.exposeName) {
                        valueObj[elementName + '_name'] = this.valueIndex[elementName + '_name'];
                    }
                    if (propObject.exposeSelection) {
                        valueObj[elementName + '_selection'] = this.valueIndex[elementName + '_selection'];
                    }
                } else {
                    const error = propObject.error || propObject.serverError;
                    errors.push([{
                        field: elementName, type: error.type, message: error.message
                    }]);
                }
            }
        }
        return {
            errors,
            data: valueObj
        };

    }

    setElementValue(elementName, value) {
        this.communication$.next({
            field: elementName, type: 'elementValue', value
        });
    }

    setElementValues(map) {
        for (const elementName in map) {
            this.setElementValue(elementName, map[elementName]);
        }
    }

    setElementProp(elementName, prop, value) {
        this.communication$.next({
            field: elementName, type: 'elementProp', prop, value
        });
    }

    setElementProps(map) {
        for (const elementName in map) {
            this.setElementProp(elementName, map[elementName].prop, map[elementName].value);
        }
    }

    forceElementServerValidation(elementName) {
        this.communication$.next({
            field: elementName,
            type: 'elementServerValidation',
            value: this.valueIndex[elementName]
        });
    }

    setElementProps(map) {
        for (const elementName in map) {
            this.setElementValue(elementName, map[elementName].prop, map[elementName].value);
        }
    }


    onSubmitHandler(e) {
        e.preventDefault();
        if (this.props.onSubmitHandler) {
            this.props.onSubmitHandler(this.getValueObject());
        }
    }

    render() {
        return <form onSubmit={this.onSubmitHandler.bind(this)} className={this.props.className}>
            {this.props.children}
        </form>;
    }
}

export class RXElementGroup extends RXForm {
    render() {
        return <div className={this.props.className}>
            {this.props.children}
        </div>;
    }
}

RXForm.childContextTypes = {
    elementProps$: PropTypes.object.isRequired,
    elementValue$: PropTypes.object.isRequired,
    communication$: PropTypes.object.isRequired,
    elementPropIndex: PropTypes.object.isRequired,
    elementValueIndex: PropTypes.object.isRequired,
};