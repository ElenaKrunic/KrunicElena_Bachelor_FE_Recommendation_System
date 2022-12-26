import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:2235/api/users/';

class UserService {

    get(id) {
        return axios.get(API_URL + 'user?userId=' + id, {headers: authHeader()});
    }
    
    edit(id, data) {
        return axios.put(API_URL + 'user?userId=' + id, data, {headers: authHeader()});
    }

    delete(id) {
        return axios.delete(API_URL + 'user?userId=' + id, {headers: authHeader()});
    }
}

export default new UserService();