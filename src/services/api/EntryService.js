var $ = require('jquery');
import ConfigService from '../general/ConfigService.js';
var toastr = require('toastr');
import { Observable } from 'rxjs/Observable';

class EntryService {
    constructor() {
        this.configService = new ConfigService();
    }

    addEntry(entryData) : Observable<Any> {
        let entryApiPath = this.configService.getEntryApiPath();

        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime
        entryData.date = entryData.date.getTime(); //milliseconds since unix epoch
        return Observable.create((observer) => {
            $.ajax({
                  url: entryApiPath,
                  type: 'POST',
                  data: entryData,
                  dataType: 'json',
                })
                .done((data, textStatus, jqXHR) => {
                    observer.next(data);
                    observer.complete();
                })
                .fail((jqXHR, textStatus, errorThrown) => {
                    observer.error(errorThrown);
                });
        });

    }//End of addEntry()

    editEntry(entryData) : Observable<Any> {
        let entryApiPath = this.configService.getEntryApiPath();
        let path = entryApiPath + '/' + entryData.id;

        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime
        entryData.date = entryData.date.getTime(); //milliseconds since unix epoch

        return Observable.create((observer) => {
            $.ajax({
              url: path,
              type: 'PUT',
              data: entryData,
              dataType: 'json',
            })
            .done((data, textStatus, jqXHR) => {
                observer.next(data);
                observer.complete();
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                observer.error(errorThrown);
            });
        });
    }

    getAllEntries() {
        let entryApiPath = this.configService.getEntryApiPath();
        var promise = $.when($.ajax({
            url: entryApiPath,
            data: {},
            type: 'GET',
            dataType: 'json'
        }));
        return promise;
    }

    getAllWinningEntries() {
        let entryApiPath = this.configService.getEntryApiPath();
        var promise = $.when($.ajax({
            url: entryApiPath,
            data: {
                'winning': true
            },
            type: 'GET',
            dataType: 'json'
        }));
        return promise;
    }

    getEntriesByCategory(category) {
        let entryApiPath = this.configService.getEntryApiPath();
        var promise = $.when($.ajax({
            url: entryApiPath,
            data: { 'category': category },
            type: 'GET',
            dataType: 'json'
        }));
        return promise;
    }

    getWinningEntriesByCategory(category) {
        let entryApiPath = this.configService.getEntryApiPath();
        var promise = $.when($.ajax({
            url: entryApiPath,
            data: { 'category': category,
                'winning': true
            },
            type: 'GET',
            dataType: 'json'
        }));
        return promise;
    }

    getEntry(id) {
        let entryApiPath = this.configService.getEntryApiPath();
        let path = entryApiPath + '/' + id;
        var promise = $.when($.ajax({
            url: path,
            data: {},
            type: 'GET',
            dataType: 'json'
        }));
        return promise;
    }

    deleteEntry(id) {
        let entryApiPath = this.configService.getEntryApiPath();
        let path = entryApiPath + '/' + id;

        //https://stackoverflow.com/questions/3071615/success-handler-for-ajax-function-with-a-non-standard-http-status-code
        var promise = $.when($.ajax({
            url: path,
            type: 'DELETE'
        }));
        return promise;
    }

}

export default EntryService;
