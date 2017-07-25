/**
 * Created by rhamsa on 18/07/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ActiveWrapper extends Component {
    render() {
        if (this.props.active) {
            return <div className={this.props.className}>
                {this.props.children}
            </div>;
        } else {
            return null;
        }
    }
}

ActiveWrapper.propTypes = {
    active:PropTypes.bool.isRequired,
    className:PropTypes.string
};

ActiveWrapper.defaultProps = {
    active:true,
    className:''
};