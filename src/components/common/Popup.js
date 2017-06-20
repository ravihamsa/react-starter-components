/**
 * Created by ravi.hamsa on 7/2/16.
 */
import React, {PropTypes, Component} from 'react';

let popupStyles = {
    display:'inline-block'
}

let bodyStyles = {
    position: 'absolute',
    left:'50%',
    top:'50%',
    transform:'translateX(-50%) translateY(-50%)',
    zIndex: 999,

}
let maskStyles = {
    position: 'absolute',
    backgroundColor:'rgba(0,0,0,0.5)',
    left:0,
    top:0,
    right:0,
    bottom:0
}

let popupContainerStyles = {
    position: 'fixed',
    zIndex: 998,
    backgroundColor:'rgba(0,0,0,0.5)',
    left:0,
    top:0,
    right:0,
    bottom:0
}

let openPopup;

class Popup extends Component {
    constructor() {
        super(...arguments)
        this.state = {
            open: false
        }
    }

    openPopup() {
        this.setState({open: true})
    }

    closePopup() {
        this.setState({open: false})
    }

    togglePopup() {
        this.state.open ? this.closePopup() : this.openPopup();
    }

    itemClick() {
        if (this.props.itemClick) {
            this.props.itemClick(arguments);
        }
    }

    render() {
        let childProps = {
            togglePopup: this.togglePopup.bind(this),
            closePopup: this.closePopup.bind(this),
            itemClick: this.itemClick.bind(this),
            isOpen: this.state.open,
            isModal: this.props.isModal
        }

        let className = this.props.className || 'popup'
        let children = this.props.children;
        if(!children.map){
            children = [children]
        }

        return <div style={popupStyles} className={className}>
            {children.map(function (children, index) {
                return React.cloneElement(children, {...childProps, key: index})
            })}
        </div>
    }
}

Popup.defaultProps = {
    isModal:true
}


class PopupButton extends Component {
    render() {
        return React.cloneElement(this.props.children, {onClick: this.props.togglePopup})
    }
}

class PopupBody extends Component {

    componentDidMount() {
        let p = this.portalElement;
        if (!p) {
            p = document.createElement('div');
            document.body.appendChild(p);
            this.portalElement = p;
        }
        this.componentDidUpdate();
    }

    updatePortalElementPosition(){
        let p = this.portalElement;
        if(!p){
            return;
        }
        let style = {position: 'absolute', left:0, top:0, width:'100%', height:'100%', backgroundColor:'rgba(0,0,0,0.5)', zIndex:99};
        for (var i in style) {
            p.style[i] = style[i];
        }
    }

    hidePortalElement(){
        let p = this.portalElement;
        if(!p){
            return;
        }
        let style = {position: 'absolute', left:0, top:0, width:0, height:0, backgroundColor:'rgba(0,0,0,0)', zIndex:99};
        for (var i in style) {
            p.style[i] = style[i];
        }
    }

    componentWillReceiveProps() {
        this.componentDidUpdate();
    }

    componentWillUnmount() {
        document.body.removeChild(this.portalElement);
    }

    maskClick(){
        if(this.props.isModal){
            this.props.closePopup();
        }
    }

    componentDidUpdate() {
        let {className = ''} = this.props;
        if (this.props.isOpen) {
            this.updatePortalElementPosition();
            ReactDOM.render(<div className={className}
                                 style={bodyStyles}>{React.cloneElement(this.props.children, {closePopup: this.props.closePopup})}</div>, this.portalElement);
        } else {
            this.hidePortalElement();
            ReactDOM.render(<div className="dummy-container"></div>, this.portalElement);
        }
    }

    render() {
        return <div className="popop-body"></div>;
    }
}

export default {
    Popup,
    PopupButton,
    PopupBody
}