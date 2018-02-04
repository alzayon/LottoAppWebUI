import React from 'react';
import { Button, Modal, OverlayTrigger } from 'react-bootstrap';

var $ = require('jquery');

//https://facebook.github.io/react/blog/2017/04/07/react-v15.5.0.html#migrating-from-react.proptypes
import PropTypes from 'prop-types';

//http://blog.revathskumar.com/2015/06/using-bootstrap-modal-with-react.html
class ConfirmModal extends React.Component {
    constructor(props) {
        super(props);
        this.affirmativeText = "Ok"
        this.negativeText = "Cancel"
        this._setPropertiesFromProps(props);
        this._bindFunctions();
    }

    componentWillMount() {

    }


    closeCallback(e) {
        this.closeCallback(e);
        console.log("Close callback was called.");
    }

    okCallback(e) {
        this.okCallback(e);
        console.log("Ok callback was called.");
    }

     _setPropertiesFromProps(props) {
        this.okCallback = props.okCallback;
        this.closeCallback = props.closeCallback;

        if (props.affirmativeText) {
            this.affirmativeText = props.affirmativeText;
        }

        if (props.negativeText) {
            this.negativeText = props.negativeText;
        }

        if (props.modalHeading) {
            this.modalHeading = props.modalHeading;
        }

        if (props.modalBody) {
            this.modalBody = props.modalBody;
        }
    }

    _bindFunctions() {
        this.closeCallback = this.closeCallback.bind(this);
        this.okCallback = this.okCallback.bind(this);
        this.modalBody = this.props.modalBody;
    }

    render() {
        return (
            <div>
                <Modal show={this.props.showModal} onHide={this.props.closeCallback}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.modalHeading}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* https://stackoverflow.com/questions/35936186/can-i-transclude-the-children-of-the-original-element-in-reactjs */}
                        {this.props.children}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeCallback}>{this.negativeText}</Button>
                        <Button onClick={this.okCallback}
                            bsStyle="primary">{this.affirmativeText}</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            );
        }
    }

    ConfirmModal.propTypes = {
        showModal: PropTypes.bool.isRequired,
        closeCallback: PropTypes.func.isRequired,
        okCallback: PropTypes.func.isRequired,
        modalHeading: PropTypes.string,
        affirmativeText: PropTypes.string,
        negativeText: PropTypes.string
    };


    export default ConfirmModal;
