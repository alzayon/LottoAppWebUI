var moment = require('moment');
var $ = require('jquery');
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/throttleTime';

//https://facebook.github.io/react/blog/2017/04/07/react-v15.5.0.html#migrating-from-react.proptypes
import PropTypes from 'prop-types';

import React from 'react';

//http://www.material-ui.com/#/components/table
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import { Link } from 'react-router-dom';
import ConfirmModal from '../widgets/ConfirmModal.jsx';

import SearchBar from 'material-ui-search-bar'


const ModalBody = () => {
    return (
        <div>
            <h3>Modal Body</h3>
        </div>
    );
};

class ListWinningEntries extends React.Component {
    constructor(props) {
        super(props);
        this.entryService = props.entryService;

        this.deleteLinkClicked = this.deleteLinkClicked.bind(this);
        this.deleteEntryAndCloseModal =
            this.deleteEntryAndCloseModal.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.onRowSelection = this.onRowSelection.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.tableBody = null;
        this.rowIndexSelected = -1;
        this.searchSubject = new Subject();

        //TODO
        //Use throttle or debounce
        var self = this;
        this.searchSubject
            .throttleTime(1000)
            .subscribe(e => {
                self.entryService.getWinningEntriesByCategory(e)
                    .then((data, textStatus, jqXHR) => {
                        self.setState({
                            'lottoEntries' : data
                        });
                });
            });
    }

    componentWillMount() {
        this.setState({
            lottoEntries: [],
            showConfirmDeleteModal: false,
            currentSelectedEntry: null
        });
    }

    componentDidMount() {
        this.entryService.getAllWinningEntries()
            .then((data, textStatus, jqXHR) => {
                this.setState({
                    'lottoEntries' : data
                });
        });
    }

    deleteLinkClicked(e) {
        this.setState({
            showConfirmDeleteModal: true
        });
        e.preventDefault();
    }

    deleteEntryAndCloseModal(e) {
        let currentSelectedEntry = this.state.currentSelectedEntry;
        this.entryService.deleteEntry(currentSelectedEntry._id)
        .then((data, textStatus, jqXHR) => {
            console.log('delete finished');
            this.entryService.getAllWinningEntries().then((data, textStatus, jqXHR) => {
                //https://stackoverflow.com/questions/40268707/how-to-unselect-all-rows-from-material-uis-table-in-reactjs
                this.tableBody.setState({
                    selectedRows: []
                });
                this.setState({
                    showConfirmDeleteModal: false,
                    currentSelectedEntry: null,
                    rowIndexSelected: -1
                });
                this.setState({
                    'lottoEntries' : data
                });
            });

        })
        .fail(function(data, jqXHR) {
            alert('error');
        });
    }

    onSearch(e) {
        this.searchSubject.next(e);
    }

    closeDeleteModal(e) {
        this.setState({
            showConfirmDeleteModal: false
        });
    }

    //https://stackoverflow.com/questions/36656447/react-material-ui-table-cant-get-element-from-row
    //http://www.material-ui.com/#/components/table
    onRowSelection(rows) {
        let rowIndexSelected = rows[0]; //Assuming only one row is selected at a time
        let currentSelectedEntry = this.state.lottoEntries[rowIndexSelected];
        this.setState({
            currentSelectedEntry: currentSelectedEntry,
            rowIndexSelected: rowIndexSelected
        });
    }

    render() {
        let deleteLinkClicked = this.deleteLinkClicked;
        let onRowSelection = this.onRowSelection;
        let onSearch = this.onSearch;
        return (
            <div>
                <ConfirmModal showModal={this.state.showConfirmDeleteModal}
                    closeCallback={this.closeDeleteModal}
                    okCallback={this.deleteEntryAndCloseModal}
                    modalBody={<ModalBody/>}/>

                    <h2 className="row">List Winning Entries</h2>

                    <div className="row">
                        <SearchBar
                            onChange={onSearch}
                            onRequestSearch={onSearch}
                            style={{
                                margin: '0 auto',
                                marginBottom: 60,
                                maxWidth: 800
                            }}
                        />
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
                                <TableBody deselectOnClickaway={false}
                                    ref={tableBody => this.tableBody = tableBody}>
                                    {/* https://stackoverflow.com/questions/29018963/iterating-through-a-json-response-in-jsx-render-for-react-js */}
                                    {this.state.lottoEntries.map(function(entry, i) {
                                        var dateDisplay = moment.utc(entry.date).toDate().toString();
                                        return (
                                            <TableRow key={entry._id}>
                                                <TableRowColumn>{entry._id}</TableRowColumn>
                                                <TableRowColumn>{entry.entry}</TableRowColumn>
                                                <TableRowColumn>{dateDisplay}</TableRowColumn>
                                                <TableRowColumn>{entry.category}</TableRowColumn>
                                                <TableRowColumn>
                                                    {/* https://stackoverflow.com/questions/21668025/react-jsx-access-props-in-quotes */}
                                                    <Link to={"/edit-entry/" + entry._id}>Edit</Link>
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

    ListWinningEntries.propTypes = {
        entryService: PropTypes.object.isRequired,
    };


    export default ListWinningEntries;
