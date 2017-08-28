import React from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

//https://facebook.github.io/react/blog/2017/04/07/react-v15.5.0.html#migrating-from-react.proptypes
import PropTypes from 'prop-types';

//http://stackoverflow.com/questions/24147331/react-the-right-way-to-pass-form-element-state-to-sibling-parent-elements
class EntryForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card>
                <CardText>
                    <div className="entryForm">
                        <form onSubmit={this.props.handleEntryFormSubmit}>
                            <div>
                                <TextField
                                    hintText="Input the lotto number"
                                    floatingLabelText="Entry number"
                                    name="entry"
                                    value={this.props.entry}
                                    onChange={this.props.handleEntryChange}
                                />
                            </div>
                            <div>
                                <TextField
                                    hintText="Input the category"
                                    floatingLabelText="Contest category"
                                    name="category"
                                    value={this.props.category}
                                    onChange={this.props.handleCategoryChange}
                                />
                            </div>
                            <div>
                                <DatePicker
                                    hintText="Landscape Dialog"
                                    floatingLabelText="Entry date"
                                    mode="landscape"
                                    value={this.props.date}
                                    onChange={this.props.handleEntryDateChange}
                                />
                            </div>
                            <div>
                                <input type="submit"></input>
                            </div>
                        </form>
                    </div>
                </CardText>
            </Card>
        );
    }
}


EntryForm.propTypes = {
  handleEntryChange: PropTypes.func.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
  handleEntryDateChange: PropTypes.func.isRequired,
  handleEntryFormSubmit: PropTypes.func.isRequired
};

export default EntryForm;
