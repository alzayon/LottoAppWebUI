import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import EntryForm from './EntryForm.jsx';
import { withRouter } from 'react-router-dom'

var moment = require('moment');
var toastr = require('toastr');

//https://facebook.github.io/react/blog/2017/04/07/react-v15.5.0.html#migrating-from-react.proptypes
import PropTypes from 'prop-types';

import * as entryDispatcher from '../../dispatcher/entry_dispatcher.js';
import Entry from '../../models/Entry.js';

//https://facebook.github.io/react/docs/react-component.html#setstate
class AddEntry extends React.Component {
    constructor(props) {
        super(props);
        this.handleEntryChange = this.handleEntryChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleEntryFormSubmit = this.handleEntryFormSubmit.bind(this);
        this.handleEntryDateChange = this.handleEntryDateChange.bind(this);
        this.handleWinningChange = this.handleWinningChange.bind(this);
        this.handleEntryFormCancel = this.handleEntryFormCancel.bind(this);
        this.entryService = props.entryService;

        let newEntry = new Entry(0,
            '',
            '',
            new Date(),
            false,
            []);
        this.props.entryActions.replaceCurrentSelectedEntry(newEntry);

    }

     componentWillMount() {

     }

     componentDidMount() {

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
        this.entryService.addEntry(this.props.entryState.entry)
            .subscribe((d) => {
                toastr.success('Save entry successful!', 'Success');
                console.log(d);
            }, (e) => {
                toastr.error('Save entry error!', 'Failed')
                console.log(e);
            }, () => {
                console.log("Completed edit entry");
            });
            e.preventDefault();
    }

    render() {
        if (this.props.entryState.entry) {
            return (
                <div>
                    <h2>Add Entry</h2>
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
        return (<div>Loading...</div>);
    }
}

AddEntry.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(AddEntry);

//https://serverless-stack.com/chapters/redirect-on-login-and-logout.html
