import RXDropdown, {RXDropdownItem} from './RXDropdown';
import Month from '../Form/DatePicker/Month';
import InlinePopupGroup from '../common/InlinePopupGroup';
import List from '../common/List';
import moment from 'moment';

const {InlinePopup, InlineButton, InlineBody} = InlinePopupGroup;

export default class RXDateRangePicker extends RXDropdown {

    constructor(props){
        super(props);
        this.state.showCalendar = false;
    }

    toggleCustomCalendar(){
        this.setState({
            showCalendar:!this.state.showCalendar
        });
    }

    renderElement() {
        const {valign = 'top', bodyPosition, ListItem = RXDropdownItem} = this.props;
        const filteredOptions = _.filter(this.props.options, item => item.name.toLowerCase().indexOf(this.state.query.toLowerCase()) > -1);


        return <InlinePopup ref={element => this.ref_inlinePopup = element} disabled={this.props.disabled}>
            <InlineButton>
                {this.renderButton()}
            </InlineButton>
            <InlineBody valign={valign} bodyPosition={bodyPosition} className="inline-popup-body-fullwidth">
                <div className="drop-down-body">
                    {this.props.showSearch ? <div className="drop-down-search-container">
                        <input type="text" autoFocus defaultValue={this.state.query} ref={element => this.ref_searchBox = element}
                            onChange={this.onKeyPressHandler} className="drop-down-input"
                            placeholder={this.props.placeholder}/>
                    </div> : null}
                    <div onClick={this.onClickHandler.bind(this)} ref={element => this.ref_listRoot = element}>
                        <List items={filteredOptions} selectionManager={this.selectionManager}
                            selection={this.state.value} ListItem={ListItem}/>
                    </div>
                    <div style={{
                        position: 'relative'
                    }} onClick={this.toggleCustomCalendar.bind(this)}>
                        <span>show custom calendar</span>
                        {this.state.showCalendar ? <div style={{
                            position: 'absolute'
                        }}>
                            <Month/>
                        </div> : null}
                    </div>
                </div>
            </InlineBody>
        </InlinePopup>;

    }
}
