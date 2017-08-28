import React from 'react';
import EntryForm from './EntryForm.jsx';
var moment = require('moment');

//https://facebook.github.io/react/blog/2017/04/07/react-v15.5.0.html#migrating-from-react.proptypes
import PropTypes from 'prop-types';

class EditEntry extends React.Component {
    constructor(props) {
        super(props);
        this.entryId = 0;
        this.handleEntryChange = this.handleEntryChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleEntryFormSubmit = this.handleEntryFormSubmit.bind(this);
        this.handleEntryDateChange = this.handleEntryDateChange.bind(this);
        this.entryService = props.entryService;

    }

    componentWillMount() {
        this.state = {
            entry: "Entry here",
            category: "Sample category",
            date: new Date(),
            id: 0
        };
    }

    //https://facebook.github.io/react/docs/react-component.htm
    componentDidMount() {
        this.entryService.getEntry(this.props.match.params.id)
            .then((data, textStatus, jqXHR) => {
                this.setState({
                    'id': this.props.match.params.id,
                    'entry': data.entry,
                    'category': data.category,
                    'date': moment.utc(data.date).toDate()
                });
            })


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
        this.entryService.editEntry(tState);
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <h2> Edit Entry </h2>
                <h3> Id : {this.state.id} </h3>
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

EditEntry.propTypes = {
  entryService: PropTypes.object.isRequired
};


export default EditEntry;
