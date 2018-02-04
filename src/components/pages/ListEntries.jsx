var moment = require('moment');
var $ = require('jquery');
var toastr = require('toastr');

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/throttleTime';

//https://facebook.github.io/react/blog/2017/04/07/react-v15.5.0.html#migrating-from-react.proptypes
import PropTypes from 'prop-types';

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//http://www.material-ui.com/#/components/table
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';

import { Link } from 'react-router-dom';
import ConfirmModal from '../widgets/ConfirmModal.jsx';

import SearchBar from 'material-ui-search-bar'

import * as entryDispatcher from '../../dispatcher/entry_dispatcher.js';
import Entry from '../../models/Entry.js';

class ListEntries extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.entryService = props.entryService;

        this.deleteLinkClicked = this.deleteLinkClicked.bind(this);
        this.deleteEntryAndCloseModal = this.deleteEntryAndCloseModal.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.onRowSelection = this.onRowSelection.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.tableBody = null;
        this.searchSubject = new Subject();

        this.props.entryActions.showConfirmDeleteModal(false);
        this.props.entryActions.replaceCurrentSelectedEntry(null);

    }

    loadEntries() {
        this.props.entryActions.getAllEntries(this.entryService);
    }

    setupSearch() {
        //TODO
        //Use throttle or debounce
        var self = this;
        this.searchSubject.throttleTime(1000).subscribe(e => {
            this.props.entryActions.getEntriesByCategory(this.entryService, e);
        });
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.props.entryActions.getAllEntries(this.entryService);
        this.setupSearch();
    }

    componentWillReceiveProps(nextProps) {}

    deleteLinkClicked(e) {
        this.props.entryActions.showConfirmDeleteModal(true);
        e.preventDefault();
    }

    deleteEntryAndCloseModal(e) {
        let successCallback = () => {
            toastr.success('Delete successful!', 'Success');
            this.props.entryActions.getAllEntries(this.entryService);
            //https://stackoverflow.com/questions/40268707/how-to-unselect-all-rows-from-material-uis-table-in-reactjs
            this.tableBody.setState({selectedRows: []});
            this.props.entryActions.showConfirmDeleteModal(false);
        };

        let errorCallback = (error) => {
            toastr.error('Something went wrong.', 'Error');
        };

        let currentSelectedEntry = this.props.entryState.entry;
        this.props.entryActions.deleteEntry(this.entryService,
            currentSelectedEntry.id,
            successCallback,
            errorCallback);

    }

    onSearch(e) {
        this.searchSubject.next(e);
    }

    closeDeleteModal(e) {
        this.props.entryActions.showConfirmDeleteModal(false);
    }

    //https://stackoverflow.com/questions/36656447/react-material-ui-table-cant-get-element-from-row
    //http://www.material-ui.com/#/components/table
    onRowSelection(rows) {
        let rowIndexSelected = rows[0]; //Assuming only one row is selected at a time
        let currentSelectedEntry = this.props.entryState.entries[rowIndexSelected];
        this.props.entryActions.replaceCurrentSelectedEntry(currentSelectedEntry);
    }

    render() {
        let deleteLinkClicked = this.deleteLinkClicked;
        let onRowSelection = this.onRowSelection;
        let onSearch = this.onSearch;
        return (
            <div>

                <ConfirmModal showModal={this.props.entryState.showConfirmDeleteModal}
                    closeCallback={this.closeDeleteModal}
                    okCallback={this.deleteEntryAndCloseModal}
                    modalHeading={'Confirm Delete'}
                    affirmativeText={'Delete'}>
                    <div>
                        <p>
                            Are you sure you want to delete this entry?
                        </p>
                    </div>
                </ConfirmModal>

                <h2 className="row">List Entries</h2>

                <div className="row">
                    <SearchBar onChange={onSearch} onRequestSearch={onSearch} style={{
                        margin: '0 auto',
                        marginBottom: 60,
                        maxWidth: 800
                    }}/>
                </div>

                <div className="row">
                    <div>
                        <Table onRowSelection={onRowSelection}>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderColumn>ID</TableHeaderColumn>
                                    <TableHeaderColumn>Entry</TableHeaderColumn>
                                    <TableHeaderColumn>Date</TableHeaderColumn>
                                    <TableHeaderColumn>Category</TableHeaderColumn>
                                    <TableHeaderColumn>-</TableHeaderColumn>
                                    <TableHeaderColumn>-</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            {/* https://stackoverflow.com/questions/39995836/how-to-set-component-state-based-on-material-ui-selected-table-rows */}
                            <TableBody deselectOnClickaway={false} ref={tableBody => this.tableBody = tableBody}>
                                {/* https://stackoverflow.com/questions/29018963/iterating-through-a-json-response-in-jsx-render-for-react-js */}
                                {this.props.entryState.entries.map(function(entry, i) {
                                    var dateDisplay = entry.date.toString();
                                    return (
                                        <TableRow key={entry.id}>
                                            <TableRowColumn>{entry.id}</TableRowColumn>
                                            <TableRowColumn>{entry.entryCombination}</TableRowColumn>
                                            <TableRowColumn>{dateDisplay}</TableRowColumn>
                                            <TableRowColumn>{entry.category}</TableRowColumn>
                                            <TableRowColumn>
                                                {/* https://stackoverflow.com/questions/21668025/react-jsx-access-props-in-quotes */}
                                                <Link to={"/edit-entry/" + entry.id}>Edit</Link>
                                            </TableRowColumn>
                                            <TableRowColumn>
                                                <a href="" onClick={deleteLinkClicked}>Delete</a>
                                            </TableRowColumn>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </div>

            </div>
        );
    }
}

ListEntries.propTypes = {
    entryService: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return Object.assign({}, {entryState: state.entryState});
}

function mapDispatchToProps(dispatch) {
    return {
        entryActions: bindActionCreators(entryDispatcher, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListEntries);
