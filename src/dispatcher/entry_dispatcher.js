import EntryService2 from '../services/api/EntryService2';
import { actionAddEntry,
         actionEditEntry,
         actionGetAllEntries,
         actionGetEntriesByCategory,
         actionGetEntry,
         actionDeleteEntry,
         actionUpdateEntryField,
         actionShowConfirmDeleteModal,
         actionReplaceCurrentSelectedEntry } from '../redux/action_creators.js';

export function addEntry(entryService, entryData) {
    return function(dispatch) {
        entryService.addEntry(entryData)
            .subscribe(
                (response) => {
                    dispatch(actionAddEntry(response));
                    if (successCallback) {
                        successCallback();
                    }
                    if (completeCallback) {
                        completeCallback();
                    }
                },
                (error) => {
                    if (errorCallback) {
                        errorCallback(error);
                    }
                },
                () => { }
            );
    }
};

export function editEntry(entryService,
    entryData,
    successCallback,
    errorCallback,
    completeCallback) {
    return function(dispatch) {
        entryService.editEntry(entryData,
            successCallback,
            errorCallback,
            completeCallback)
            .subscribe(
                (response) => {
                    //TODO
                    //How come there is no js error if the actionEditEntry
                    //was not imported
                    dispatch(actionEditEntry(response));
                    if (successCallback) {
                        successCallback();
                    }
                    if (completeCallback) {
                        completeCallback();
                    }
                },
                (error) => {
                    if (errorCallback) {
                        errorCallback(error);
                    }
                },
                () => { }
            );
    }
};


export function getAllEntries(entryService) {
    return function(dispatch) {
        //TODO
        //Dispatch loading
        //Use rxjs startWith() operator
        let successCallback = (response) => dispatch(actionGetAllEntries(response));
        _getAllEntries(entryService, successCallback)
    }
};

function _getAllEntries(entryService, successCallback) {
    entryService.getAllEntries()
        .subscribe(
            (response) => {
                successCallback(response);
            },
            (error) => {
                //TODO
                //Dispatch an error
            },
            () => {}
        );
}

export function getEntriesByCategory(entryService, category) {
    return function(dispatch) {
        //TODO
        //Dispatch loading
        //Use rxjs startWith() operator
        entryService.getEntriesByCategory(category)
            .subscribe(
                (response) => {
                    dispatch(actionGetEntriesByCategory(response));
                },
                (error) => {
                    //TODO
                    //Dispatch an error
                },
                () => {}
            );
    }
};


export function getEntry(entryService, id) {
    return function(dispatch) {
        //TODO
        //Dispatch loading
        //Use rxjs startWith() operator
        entryService.getEntry(id)
            .subscribe(
                (response) => {
                    dispatch(actionGetEntry(response));
                },
                (error) => {
                    //TODO
                    //Dispatch an error
                },
                () => {}
            );
    }
};

export function updateEntryField(entry) {
    return function(dispatch) {
        dispatch(actionUpdateEntryField(entry))
    }
}

export function deleteEntry(entryService,
    id,
    successCallback,
    errorCallback,
    completeCallback) {
        return function(dispatch) {
            entryService.deleteEntry(id)
                .subscribe(
                    (response) => {
                        dispatch(actionDeleteEntry(id));
                        if (successCallback) {
                            successCallback();
                        }
                        if (completeCallback) {
                            completeCallback();
                        }
                    },
                    (error) => {
                        if (errorCallback) {
                            errorCallback(error);
                        }
                    },
                    () => {}
                );
        }
}

export function showConfirmDeleteModal(toggle) {
    return function(dispatch) {
        dispatch(actionShowConfirmDeleteModal(toggle))
    }
}

export function replaceCurrentSelectedEntry(entry) {
    return function(dispatch) {
        dispatch(actionReplaceCurrentSelectedEntry(entry))
    }
}
