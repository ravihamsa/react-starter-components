/**
 * Created by ravi.hamsa on 3/26/17.
 */
import RXFormElement from './RXFormElement'

export default class RXFileInput extends RXFormElement {

}


RXFileInput.defaultProps = {
    ...RXFormElement.defaultProps,
    type:'file'
}