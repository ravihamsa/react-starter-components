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
        this.elementPropIndex = {};
        this.valueIndex = {};
    }

    componentWillMount() {
        let read$ = this.elementValue$.filter(e => e.type === 'read');
        let update$ = this.elementValue$.filter(e => e.type === 'update');
        let register$ = this.elementProps$.filter(e => e.type === 'register');
        let other$ = this.elementProps$.filter(e => e.type !== 'register');

        register$.subscribe(val => {
            ensurePropertyIndex(this.elementPropIndex, val.field);
        });

        other$.subscribe(val => {
            ensurePropertyIndex(this.elementPropIndex[val.field], val.type);
            this.elementPropIndex[val.field][val.type] = val.value;
        });

        read$.merge(update$).subscribe(val => {
            this.valueIndex[val.field] = val.value;
        })

        update$.subscribe(val => {
            this.valueChangeHandler({[val.field]: val.value}, this.valueIndex);
        })

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
            elementPropIndex: this.elementPropIndex,
            elementValueIndex: this.valueIndex,
        }
    }

    onSubmitHandler(e) {
        e.preventDefault();
    }

    render() {
        return <form onSubmit={this.onSubmitHandler.bind(this)} className={this.props.className}>
            {this.props.children}
        </form>
    }
}

RXForm.childContextTypes = {
    elementProps$: PropTypes.object.isRequired,
    elementValue$: PropTypes.object.isRequired,
    elementPropIndex: PropTypes.object.isRequired,
    elementValueIndex: PropTypes.object.isRequired,
}