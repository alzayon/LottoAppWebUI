import React from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Checkbox from 'material-ui/Checkbox';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

//https://facebook.github.io/react/blog/2017/04/07/react-v15.5.0.html#migrating-from-react.proptypes
import PropTypes from 'prop-types';

//http://stackoverflow.com/questions/24147331/react-the-right-way-to-pass-form-element-state-to-sibling-parent-elements
class EntryForm extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    render() {
        return (
            <Card>
                <CardText>
                    <div className="entryForm">
                        <form onSubmit={this.props.handleEntryFormSubmit}>
                            <div>
                                <TextField
                                    floatingLabelText="Entry number"
                                    name="entry"
                                    value={this.props.entry.entryCombination}
                                    onChange={this.props.handleEntryChange}
                                />
                            </div>
                            <div>
                                <TextField
                                    floatingLabelText="Contest category"
                                    name="category"
                                    value={this.props.entry.category}
                                    onChange={this.props.handleCategoryChange}
                                />
                            </div>
                            <div>
                                <DatePicker
                                    name="date"
                                    hintText="Landscape Dialog"
                                    floatingLabelText="Entry date"
                                    mode="landscape"
                                    value={this.props.entry.date}
                                    onChange={this.props.handleEntryDateChange}
                                />
                            </div>
                            <div>
                                <Checkbox
                                    label="Winning?"
                                    name="winning"
                                    checked={this.props.entry.winning}
                                    onCheck={this.props.handleWinningChange}
                                />
                            </div>
                            <div>
                                <RaisedButton label="Cancel"
                                    onClick={this.props.handleEntryFormCancel}
                                    style={style} />
                                <RaisedButton type="submit"
                                    label="Save"
                                    primary={true}
                                    style={style} />
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
  handleWinningChange: PropTypes.func.isRequired,
  handleEntryFormSubmit: PropTypes.func.isRequired,
  handleEntryFormCancel: PropTypes.func.isRequired
};

export default EntryForm;
