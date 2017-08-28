import React from 'react';
import { Button, Modal, OverlayTrigger } from 'react-bootstrap';

var $ = require('jquery');

//https://facebook.github.io/react/blog/2017/04/07/react-v15.5.0.html#migrating-from-react.proptypes
import PropTypes from 'prop-types';

//http://blog.revathskumar.com/2015/06/using-bootstrap-modal-with-react.html
class ConfirmModal extends React.Component {
    constructor(props) {
        super(props);
        this.closeCallback = this.closeCallback.bind(this);
        this.okCallback = this.okCallback.bind(this);
    }

    componentWillMount() {

    }


    closeCallback(e) {
        this.props.closeCallback(e);
        console.log("Close callback was called.");
    }

    okCallback(e) {
        this.props.okCallback(e);
        console.log("Ok callback was called.");
    }


    render() {
        return (
            <div>
                <Modal show={this.props.showModal} onHide={this.props.closeCallback}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.modalBody}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.closeCallback}>Close</Button>
                        <Button onClick={this.props.okCallback}
                            bsStyle="primary">Save changes</Button>
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
    };


    export default ConfirmModal;
