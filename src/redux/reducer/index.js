import { combineReducers } from 'redux';
import entryReducer from './entry_reducer.js';
import miscReducer from './misc_reducer.js';

const rootReducer = combineReducers({
  entryState: entryReducer,
  miscState: miscReducer
});

export default rootReducer;
