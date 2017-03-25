/**
 * Created by ravi.hamsa on 3/26/17.
 */
import RXFormElement from './RXFormElement'
import ReactDOM from 'react-dom';

export default class RXRadioList extends RXFormElement {
    readInputValue(){
        let rootNode = ReactDOM.findDOMNode(this);
        let selectedInput = rootNode.querySelector('input:checked');
        if(selectedInput){
            this.updateProps(selectedInput.value, 'defaultValue');
            this.updateValue(selectedInput.value, 'read');
        }
    }

    onChange(e) {
        this.updateProps(e.target.value, 'defaultValue');
        this.updateValue(e.target.value, 'update');
    }

    renderElement() {
        let {options, name} = this.props;
        return <div  onChange={this.onChange.bind(this)}>
            {options.map(function (option, index) {
                let checked = this.state.defaultValue === option.id;
                return (
                    <label key={index}>
                        <input type="radio" name={name}
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
