/**
 * Created by rhamsa on 18/07/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class HidingWrapper extends Component {
    render() {
        let {className = ''} = this.props;
        if (!this.props.active) {
            className += ' hidden';
        }
        return <div className={className}>
            {this.props.children}
        </div>;
    }
}

HidingWrapper.propTypes = {
    active: PropTypes.bool.isRequired,
    className: PropTypes.string
};

HidingWrapper.defaultProps = {
    active: true,
    className: ''
};