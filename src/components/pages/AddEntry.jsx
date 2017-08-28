import React from 'react';
import EntryForm from './EntryForm.jsx';
var moment = require('moment');

//https://facebook.github.io/react/blog/2017/04/07/react-v15.5.0.html#migrating-from-react.proptypes
import PropTypes from 'prop-types';

//https://facebook.github.io/react/docs/react-component.html#setstate
class AddEntry extends React.Component {
    constructor(props) {
        super(props);
        this.handleEntryChange = this.handleEntryChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleEntryFormSubmit = this.handleEntryFormSubmit.bind(this);
        this.handleEntryDateChange = this.handleEntryDateChange.bind(this);

    }

     componentWillMount() {
         this.state = {
             entry: "",
             category: "",
             date: new Date()
         };
     }

    //http://www.material-ui.com/#/components/date-picker
    //https://stackoverflow.com/questions/9873197/convert-date-to-timestamp-in-javascript
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime
    handleEntryDateChange(e, newDate) {
        let self = this;
        self.setState(
            {
                date: newDate
            }
        );
    }

    handleEntryChange(e) {
        let self = this;
        self.setState(
            {
                entry: e.target.value
            },
            () => {}
        );
    }

    handleCategoryChange(e) {
        let self = this;
        self.setState(
            {
                category: e.target.value
            }
        );
    }

    handleEntryFormSubmit(e) {
        let tState = this.state;
        this.entryService.addEntry(tState);
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <h2>Add Entry</h2>
                <EntryForm handleEntryChange={this.handleEntryChange}
                 handleEntryDateChange={this.handleEntryDateChange}
                 handleCategoryChange={this.handleCategoryChange}
                 handleEntryFormSubmit={this.handleEntryFormSubmit}
                 entry={this.state.entry}
                 category={this.state.category}
                 date={this.state.date}
                />
            </div>
        );
    }
}

AddEntry.propTypes = {
  entryService: PropTypes.object.isRequired
};

export default AddEntry;
