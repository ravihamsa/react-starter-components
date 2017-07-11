/**
 * Created by rhamsa on 10/07/17.
 */
import RXSelect from './RXSelect';

export default class RXPlainSelect extends  RXSelect {
    renderElementWithWrapper(){
        return this.renderElement();
    }
}