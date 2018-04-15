/**
 * Created by ravi.hamsa on 7/2/16.
 */

import React, {Component} from 'react';
import moment from 'moment';
import List from './List';
import util, {_} from '../../core/utils';


const shortDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((nm, index) => ({
    id: index,
    name: nm
}));

const today = moment();


class Day extends Component {
    render() {
        const item = this.props.itemData;

        const booleanClasses = _.map(['today', 'selected', 'selectable'], className => item[className] === true ? className : '');
        booleanClasses.push('day');
        return <td id={item.id}
            onClick={this.onClickHandler.bind(this)}>
            <div className={booleanClasses.join(' ')}>{item.date}</div>
        </td>;
    }

    onClickHandler() {
        if (this.props.itemData.selectable) {
            //this.props.selectionStore.onSelect(this.props.itemData);
            this.props.onDateClick(this.props.itemData);
        }

    }
}

class WeekHeading extends Component {
    render() {
        return <td className='day-heading'>{this.props.itemData.name}</td>;
    }
}


class Month extends Component {
    constructor(props) {
        super(...arguments);
        this.selectionStore = props.selectionStore;
        this.DATE_FORMAT = util.getStarterConfig('dateFormat');
        this.state = {
            displayDate: props.displayDate || today.format(this.DATE_FORMAT),
            selectedDate: props.selectedDate || null,
            minDate: props.minDate || today.format(this.DATE_FORMAT),
            maxDate: props.maxDate
        };
    }


    bumpMonth(diff) {
        const displayDate = moment(this.state.displayDate, this.DATE_FORMAT);
        this.setState({
            displayDate: displayDate.add(diff, 'month').format(this.DATE_FORMAT)
        });
    }

    nextMonth(event) {
        event.preventDefault();
        this.bumpMonth(1);
    }

    prevMonth(event) {
        event.preventDefault();
        this.bumpMonth(-1);
    }


    onDateClick(dateObject){
        const DATE_FORMAT = util.getStarterConfig('dateFormat');
        const dateValue =  dateObject.dateObject.format(this.DATE_FORMAT);
        this.setState({
            selectedDate: dateObject.dateObject.format(this.DATE_FORMAT)
        });
        this.props.onDateSelect(dateValue);
        this.props.closePopup();
    }

    render() {
        const displayDate = moment(this.state.displayDate, this.DATE_FORMAT);
        const selectedDate = moment(this.state.selectedDate, this.DATE_FORMAT);
        const minDate = moment(this.state.minDate, this.DATE_FORMAT);
        const maxDate = moment(this.state.maxDate, this.DATE_FORMAT);
        const today = moment();

        const startDate = displayDate.clone().startOf('month').startOf('week');

        const rows = [];
        let cols = [];
        rows.push(
            <List items={shortDays} tagName="tr" ListItem={WeekHeading} key={rows.length}></List>
        );
        for (let i = 0; i < 42; i++) {
            cols.push({
                id: 7 + i,
                dateObject: startDate.clone(),
                today: startDate.isSame(today, 'day'),
                selected: selectedDate && selectedDate.isSame(startDate),
                selectable: startDate.isSame(displayDate, 'month') && startDate.diff(minDate, 'day') >= 0 && maxDate.diff(startDate, 'day') >= 0,
                day: startDate.day(),
                date: startDate.date()
            });

            startDate.add(1, 'days');

            if (cols.length === 7) {
                rows.push(
                    <List items={cols} ListItem={Day} tagName="tr" key={i} onDateClick={this.onDateClick.bind(this)}></List>
                );
                cols = [];
            }
        }


        return (
            <div className='month'>
                <div className={'month-header' + ' row no-gutters'}>
                    <div className="col-md-3"><a href="#" className='month-prev'
                        onClick={this.prevMonth.bind(this)}>&lt;</a></div>
                    <div className={'month-name' + ' col-md-6'}>{displayDate.format('MMM - YYYY')}</div>
                    <div className="col-md-3"><a href="#" className={'month-next'}
                        onClick={this.nextMonth.bind(this)}>&gt;</a></div>
                </div>
                <table>
                    <tbody>{rows}</tbody>
                </table>
            </div>

        );
    }
}


export default Month;