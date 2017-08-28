class ConfigService {

    getEntryApiPath() {
        return this.getBaseApiPath() + "/lotto_entries";
    }

    getBaseApiPath() {
        return 'http://localhost:8777/api';
    }

}

export default ConfigService;
