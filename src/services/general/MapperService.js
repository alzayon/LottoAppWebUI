var moment = require('moment');

import Entry from '../../models/Entry.js';

export default class MapperService {
    mapJsonToEntry(json) {
        return new Entry(json._id,
            json.category,
            json.entry,
            moment(json.date).toDate(),
            json.winning == 'true',
            json.links);
    }

    mapEntryToJson(entry) {
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime
        return {
            'id': entry.id,
            'category': entry.category,
            'entry': entry.entryCombination,
            'date': entry.date.getTime(),
            'winning': entry.winning,
            'links': entry.links
        };
    }
}
