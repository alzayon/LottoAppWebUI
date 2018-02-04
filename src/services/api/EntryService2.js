import axios from 'axios';
import { Observable } from 'rxjs/Observable';
import MapperService from '../general/MapperService.js';
import ConfigService from '../general/ConfigService.js';

class EntryService2 {
    constructor(configService: ConfigService, mapperService: MapperService) {
        this.configService = configService;
        this.mapperService = mapperService;
    }

    addEntry(entryData) : Observable<Any> {
        let entryApiPath = this.configService.getEntryApiPath();

        let entryApiObject = this.mapperService.mapEntryToJson(entryData);

        return Observable.create((observer) => {
            axios.post(entryApiPath, entryApiObject)
              .then((response) => {
                  if (response.status == "200") {
                      observer.next(response.data);
                      observer.complete();
                  } else {
                     //TODO
                  }
              })
              .catch((err) => {
                observer.error(err);
              })
        });

    }//End of addEntry()

    editEntry(entryData) : Observable<Any> {
        let self = this;
        let entryApiPath = this.configService.getEntryApiPath();
        let path = entryApiPath + '/' + entryData.id;

        let entryApiObject = this.mapperService.mapEntryToJson(entryData);

        return Observable.create((observer) => {
            axios.put(path, entryApiObject)
              .then((response) => {
                  if (response.status == "200") {
                      let updatedEntry = self.mapperService.mapJsonToEntry(response.data);
                      observer.next(updatedEntry);
                      observer.complete();
                  } else {
                      //TODO
                  }

              })
              .catch((err) => {
                observer.error(err);
            });
        });

    }//End of editEntry()

    getAllEntries() {
        let entryApiPath = this.configService.getEntryApiPath();
        return Observable.create((observer) => {
            axios.get(entryApiPath)
               .then((response) => {
                   if (response.status == "200") {
                       let entriesList = [];
                       for (let ee of response.data) {
                           let entryApiObject = this.mapperService.mapJsonToEntry(ee);
                           entriesList.push(entryApiObject);
                       }
                       observer.next(entriesList);
                       observer.complete();
                   } else {
                       //TODO
                   }
               });
        });
    }

    getAllWinningEntries() {
        let entryApiPath = this.configService.getEntryApiPath() + '?winning=true';
        return axios.get(entryApiPath);
    }

    getEntriesByCategory(category) {
        let entryApiPath =
            this.configService.getEntryApiPath() + '?category=' + category;
        return Observable.create((observer) => {
            axios.get(entryApiPath)
               .then((response) => {
                   if (response.status == "200") {
                       observer.next(response.data);
                       observer.complete();
                   } else {
                       //TODO
                   }
               });
        });
    }

    getWinningEntriesByCategory(category) {
        let entryApiPath = this.configService.getEntryApiPath() + '?winning=true'
            + '&category=' + category;
        return axios.get(entryApiPath);
    }

    getEntry(id) {
        let entryApiPath = this.configService.getEntryApiPath() + '/' + id;
        return Observable.create((observer) => {
            axios.get(entryApiPath)
               .then((response) => {
                   if (response.status == "200") {
                       let entryModel = this.mapperService.mapJsonToEntry(response.data)
                       observer.next(entryModel);
                       observer.complete();
                   } else {
                       //TODO
                   }
               });
        });
    }

    deleteEntry(id, su) {
        let entryApiPath = this.configService.getEntryApiPath() + '/' + id;
        let path = entryApiPath + '/' + id;

        return Observable.create((observer) => {
            axios.delete(entryApiPath).
                then((response) => {
                    if (response.status == "204") {
                        observer.next(true);
                        observer.complete();
                    } else {
                        //TODO
                    }
                });
        });
    }
}

export default EntryService2;
