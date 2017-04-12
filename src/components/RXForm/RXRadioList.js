/**
 * Created by ravi.hamsa on 3/26/17.
 */
import RXFormElement from './RXFormElement'
import ReactDOM from 'react-dom';

export default class RXRadioList extends RXFormElement {

    renderElement() {
        let {options, name} = this.props;
        return <div  onChange={this.onChange.bind(this)}>
            {options.map(function (option, index) {
                let checked = this.state.value === option.id;
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
