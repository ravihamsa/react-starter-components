/**
 * Created by ravi.hamsa on 3/26/17.
 */
import RXFormElement from './RXFormElement'

export default class RXTextArea extends RXFormElement {
    renderElement() {
        let restProps = this.getRestProps();
        return <textarea  {...restProps} onChange={this.onChange.bind(this)}/>
    }
}
