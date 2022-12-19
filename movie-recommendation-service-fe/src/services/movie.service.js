import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:2235/api/movies/';

class MovieService {

    get(id) {
        return axios.get(API_URL + `${id}`, {headers: authHeader()});
    }
    
    getAll() {
        return axios.get(API_URL + 'all', { headers: authHeader()});
    }

    searchByTitle(title) {
        return axios.get(API_URL + `getByTitle?title=${title}`, {headers: authHeader()});
    }
}

export default new MovieService();