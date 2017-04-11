/**
 * Created by ravi.hamsa on 3/26/17.
 */
import React, {PropTypes, Component} from "react";
import Rx from 'rxjs';

let ensurePropertyIndex = (obj, prop) => {
    obj[prop] = obj[prop] || {};
}

export default class RXForm extends Component {
    constructor(props) {
        super(props);
        this.elementProps$ = new Rx.Subject();
        this.elementValue$ = new Rx.Subject();
        this.communication$ = new Rx.Subject();
        this.elementPropIndex = {};
        this.valueIndex = {};
    }

    componentWillMount() {
        let read$ = this.elementValue$.filter(e => e.type === 'read');
        let update$ = this.elementValue$.filter(e => e.type === 'update');
        let selection$ = this.elementValue$.filter(e => e.type === 'selection');
        let name$ = this.elementValue$.filter(e => e.type === 'name');
        let register$ = this.elementProps$.filter(e => e.type === 'register');
        let other$ = this.elementProps$.filter(e => e.type !== 'register');
        let shadowValue$ = this.elementProps$.filter(e => e.type !== '__shadowValue');
        //&& e.type !== '__shadowValue'

        register$.subscribe(val => {
            ensurePropertyIndex(this.elementPropIndex, val.field);
        });

        other$.merge(shadowValue$).subscribe(val => {
            ensurePropertyIndex(this.elementPropIndex[val.field], val.type);
            this.elementPropIndex[val.field][val.type] = val.value;
        });

        read$.merge(update$, selection$, name$).subscribe(val => {
            this.valueIndex[val.field] = val.value;
        })


        update$.subscribe(val => {
            this.valueChangeHandler({[val.field]: val.value}, this.valueIndex);
        })

        other$.subscribe(val => {
            this.propChangeHandler(val);
        })

        // selection$.subscribe(e => console.log(e))
    }

    propChangeHandler(changed) {
        // console.log(changed, fullObject);
        if (this.props.onPropChange) {
            this.props.onPropChange(changed)
        }
    }

    valueChangeHandler(changed, fullObject) {
        // console.log(changed, fullObject);
        if (this.props.onValueChange) {
            this.props.onValueChange(changed, fullObject)
        }
    }

    getChildContext() {
        return {
            elementProps$: this.elementProps$,
            elementValue$: this.elementValue$,
            communication$: this.communication$,
            elementPropIndex: this.elementPropIndex,
            elementValueIndex: this.valueIndex,
        }
    }

    getValueObject() {
        let valueObj = {};
        let errors = [];
        for (var elementName  in this.elementPropIndex) {
            let propObject = this.elementPropIndex[elementName];
            if (propObject.active) {
                this.communication$.next({field: elementName, type: 'validate', value: this.valueIndex[elementName]});
                if (propObject.valid) {
                    valueObj[elementName] = this.valueIndex[elementName];
                } else {
                    let error = propObject.error;
                    errors.push([{field: elementName, type: error.type, message: error.message}])
                }
            }
        }
        return {
            errors: errors,
            data: valueObj
        }

    }

    setElementValue(elementName, value){
        this.communication$.next({field:elementName, type:'elementValue', value:value});
    }

    setElementValues(map){
        for(var elementName in map){
            this.setElementValue(elementName, map[i]);
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
        </form>
    }
}

export class RXElementGroup extends RXForm {
    render() {
        return <div className={this.props.className}>
            {this.props.children}
        </div>
    }
}

RXForm.childContextTypes = {
    elementProps$: PropTypes.object.isRequired,
    elementValue$: PropTypes.object.isRequired,
    communication$: PropTypes.object.isRequired,
    elementPropIndex: PropTypes.object.isRequired,
    elementValueIndex: PropTypes.object.isRequired,
}