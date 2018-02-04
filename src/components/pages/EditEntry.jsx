import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import EntryForm from './EntryForm.jsx';
var moment = require('moment');
var toastr = require('toastr');

//https://facebook.github.io/react/blog/2017/04/07/react-v15.5.0.html#migrating-from-react.proptypes
import PropTypes from 'prop-types';

import * as entryDispatcher from '../../dispatcher/entry_dispatcher.js';

class EditEntry extends React.Component {
    constructor(props) {
        super(props);
        this.entryId = 0;
        this.handleEntryChange = this.handleEntryChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleEntryFormSubmit = this.handleEntryFormSubmit.bind(this);
        this.handleEntryDateChange = this.handleEntryDateChange.bind(this);
        this.handleWinningChange = this.handleWinningChange.bind(this);
        this.handleEntryFormCancel = this.handleEntryFormCancel.bind(this);
        this.entryService = props.entryService;
    }

    componentWillMount() {

    }

    //https://facebook.github.io/react/docs/react-component.htm
    componentDidMount() {
        this.props.entryActions.getEntry(this.entryService,
            this.props.match.params.id);
    }

    handleEntryFormCancel(e) {
        this.props.history.push('/list-entries');
    }

    //http://www.material-ui.com/#/components/date-picker
    //https://stackoverflow.com/questions/9873197/convert-date-to-timestamp-in-javascript
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime
    handleEntryDateChange(e, newDate) {
        let entry = this.props.entryState.entry;
        entry.date = newDate;
        this.props.entryActions.updateEntryField(entry);
    }

    handleEntryChange(e) {
        let entry = this.props.entryState.entry;
        entry.entryCombination = e.target.value;
        this.props.entryActions.updateEntryField(entry);
    }

    handleCategoryChange(e) {
        let entry = this.props.entryState.entry;
        entry.category = e.target.value;
        this.props.entryActions.updateEntryField(entry);
    }

    handleWinningChange(e) {
        let entry = this.props.entryState.entry;
        entry.winning = e.target.checked;
        this.props.entryActions.updateEntryField(entry);
    }

    handleEntryFormSubmit(e) {
        let successCallback = () => {
            toastr.success('Save entry successful!', 'Success');
        };
        let errorCallback = (error) => {
            toastr.error('Something went wrong!', 'Error');
        };
        this.props.entryActions.editEntry(this.entryService,
            this.props.entryState.entry,
            successCallback,
            errorCallback);
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <h2>
                    Edit Entry
                </h2>
                <h3>
                    Id : {this.props.entryState.entry.id}
                </h3>
                <EntryForm handleEntryChange={this.handleEntryChange}
                    handleEntryDateChange={this.handleEntryDateChange}
                    handleCategoryChange={this.handleCategoryChange}
                    handleEntryFormSubmit={this.handleEntryFormSubmit}
                    handleWinningChange={this.handleWinningChange}
                    handleEntryFormCancel={this.handleEntryFormCancel}
                    entry={this.props.entryState.entry}/>
            </div>
        );
    }
}

EditEntry.propTypes = {
    entryService: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return Object.assign({}, {
        entryState: state.entryState
    });
}

function mapDispatchToProps(dispatch) {
    return {
        entryActions: bindActionCreators(entryDispatcher, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEntry);
