/**
 * Created by rhamsa on 10/07/17.
 */
import RXTextInput from './RXTextInput'

export default class RXPlainTextInput extends  RXTextInput {
    renderElementWithWrapper(){
        return this.renderElement();
    }
}