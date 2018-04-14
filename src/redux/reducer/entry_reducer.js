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
    REPLACE_CURRENT_SELECTED_ENTRY
} from '../action_constants.js';
import initialState from '../initial_state.js';

/////////////////REDUCER/////////////////////
//initiate your starting state
const entryReducer = (state = initialState.entryState, action) => {
    switch (action.type) {
        case ADD_ENTRY:
            return Object.assign({}, state, { entry: action.entry });
        case EDIT_ENTRY:
            return Object.assign({}, state, { entry: action.entry });
        case GET_ALL_ENTRIES:
            if (!action.entries) {
                return state;
            } else {
                return Object.assign({}, state, { entries: action.entries });
            }
        case GET_ALL_WINNING_ENTRIES:
            if (!action.winningEntries) {
                return state;
            } else {
                return Object.assign({}, state, { winningEntries: action.winningEntries });
            }
        case GET_ENTRIES_BY_CATEGORY:
            return Object.assign({}, state, { entries: action.entries });
        case GET_WINNING_ENTRIES_BY_CATEGORY:
            return Object.assign({}, state, { entries: action.tasks.objects });
        case GET_ENTRY:
            return Object.assign({}, state, { entry: action.entry });
        case DELETE_ENTRY:
            return Object.assign({}, state);
        case UPDATE_ENTRY_FIELD:
            return Object.assign({}, state, { entry: action.entry });
        case SHOW_CONFIRM_DELETE_MODAL:
            return Object.assign({}, state, { showConfirmDeleteModal: action.showConfirmDeleteModal });
        case REPLACE_CURRENT_SELECTED_ENTRY:
            return Object.assign({}, state, { entry: action.entry });
        default:
            return state;
    }
};
export default entryReducer;
