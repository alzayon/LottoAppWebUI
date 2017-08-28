var $ = require('jquery');
import ConfigService from '../general/ConfigService.js';

class EntryService {
    constructor() {
        this.configService = new ConfigService();
    }

    addEntry(entryData) {
        let entryApiPath = this.configService.getEntryApiPath();

        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime
        entryData.date = entryData.date.getTime(); //milliseconds since unix epoch

        $.ajax({
          url: entryApiPath,
          type: 'POST',
          data: entryData,
          dataType: 'json',
        })
        .done((data, textStatus, jqXHR) => {
            //TODO
            console.log(data);
        })
        .fail((jqXHR, textStatus, errorThrown) => {
            console.log(errorThrown);
        });
    }//End of addEntry()

    editEntry(entryData) {
        let entryApiPath = this.configService.getEntryApiPath();
        let path = entryApiPath + '/' + entryData.id;

        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime
        entryData.date = entryData.date.getTime(); //milliseconds since unix epoch

        console.log(entryData);
        $.ajax({
          url: path,
          type: 'PUT',
          data: entryData,
          dataType: 'json',
        })
        .done((data, textStatus, jqXHR) => {
            //TODO
            console.log(data);
        })
        .fail((jqXHR, textStatus, errorThrown) => {
            console.log(errorThrown);
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
