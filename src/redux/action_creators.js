import {
    ADD_ENTRY,
    EDIT_ENTRY,
    GET_ALL_ENTRIES,
    GET_ALL_WINNING_ENTRIES,
    GET_ENTRIES_BY_CATEGORY,
    GET_WINNING_ENTRIES_BY_CATEGORY,
    GET_ENTRY,
    DELETE_ENTRY,
    UPDATE_ENTRY_FIELD,
    SHOW_CONFIRM_DELETE_MODAL,
    REPLACE_CURRENT_SELECTED_ENTRY,
    INITIALIZE_NEW_ENTRY
} from './action_constants.js';

/////////////////ACTIONS//////////////
const actionAddEntry = (entryData) => ({ type: ADD_ENTRY, "entry": entryData });
const actionEditEntry = (entryData) => ({ type: EDIT_ENTRY, "entry": entryData });
const actionGetAllEntries = (entriesList) => ({ type: GET_ALL_ENTRIES, entries:entriesList });
const actionGetAllWinningEntries = () => ({ type: GET_ALL_WINNING_ENTRIES });
const actionGetEntriesByCategory = (entriesList) => ({ type: GET_ENTRIES_BY_CATEGORY, entries:entriesList });
const actionGetWinningEntriesByCategory = (slug) => ({ type: GET_ALL_WINNING_ENTRIES_BY_CATEGORY });
const actionGetEntry = (entryItem) => ({ type: GET_ENTRY, "entry": entryItem });
const actionDeleteEntry = (id) => ({ type: DELETE_ENTRY, "id": id });
const actionUpdateEntryField = (entryItem) => ({ type: UPDATE_ENTRY_FIELD, "entry": entryItem });
const actionShowConfirmDeleteModal = (toggle) => ({ type: SHOW_CONFIRM_DELETE_MODAL, "showConfirmDeleteModal": toggle });
const actionReplaceCurrentSelectedEntry = (entryItem) =>  ({ type: REPLACE_CURRENT_SELECTED_ENTRY, "entry": entryItem });
const actionInitializeNewEntry = (entryItem) =>  ({ type: INITIALIZE_NEW_ENTRY, "entry": entryItem });

//https://stackoverflow.com/questions/34645731/export-more-than-one-variable-in-es6
export {
    actionAddEntry,
    actionEditEntry,
    actionGetAllEntries,
    actionGetAllWinningEntries,
    actionGetEntriesByCategory,
    actionGetWinningEntriesByCategory,
    actionGetEntry,
    actionDeleteEntry,
    actionUpdateEntryField,
    actionShowConfirmDeleteModal,
    actionReplaceCurrentSelectedEntry,
    actionInitializeNewEntry
};

//DISPATCHERS found in dispatcher/ files
