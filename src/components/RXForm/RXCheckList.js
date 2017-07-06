/**
 * Created by ravi.hamsa on 3/26/17.
 */
import RXFormElement from './RXFormElement'
import ReactDOM from 'react-dom';
import {_} from '../../core/utils'

export default class RXCheckboxList extends RXFormElement {
    /*readInputValue(){
        let valueRead = this.getSelectedValues();
        this.updateValue(valueRead, 'read');
    }*/

    getSelectedValues(){
        let rootNode = ReactDOM.findDOMNode(this);
        let selectedInput = rootNode.querySelectorAll('input:checked');
        return _.map(selectedInput, el=>el.value).join(',');
    }

    onChange(e) {
        let valueRead = this.getSelectedValues();
        this.updateValue(valueRead, 'update');
    }

    renderElement() {
        let {options, name} = this.props;
        return <div  onChange={this.onChange.bind(this)}>
            {options.map(function (option, index) {
                let lastValue = this.getValue();
                let selectedOptions = lastValue.split(',')
                let checked = selectedOptions.indexOf(option.id) > -1;
                return (
                    <label key={index}>
                        <input type="checkbox" name={name}
                               value={option.id}
                               defaultChecked={checked}
                               id={"radio-" + name + "-" + option.id}/>
                        <label htmlFor={"radio-" + name + "-" + option.id}>{option.name}</label>
                    </label>
                )
            }, this)}
        </div>
    }
}
