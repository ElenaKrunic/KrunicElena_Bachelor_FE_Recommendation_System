import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:2235/api/customLists/';

class CustomListService {

    get(id) {
        return axios.get(API_URL + `${id}`, { headers: authHeader()});
    }

    create(data) {
        return axios.post(API_URL + data, { headers: authHeader()});
    }

    edit(id,data) {
        return axios.put(API_URL + `updateCustomList/${id}`, data, { headers: authHeader()});
    }

    delete(id) {
        return axios.delete(API_URL + `deleteCustomList/${id}`, { headers: authHeader()});
    }

    deleteAll() {
        return axios.delete(API_URL + `deleteAll`, { headers: authHeader()});
    }

    findByName(name) {
        return axios.get(API_URL + `getByName?name=${name}`, { headers: authHeader()});
    }
}

export default new CustomListService();