import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:2235/api/movies/';

class MovieService {

    get(id) {
        return axios.get(API_URL + `fullMovie/${id}`, {headers: authHeader()});
    }
    
    getAll() {
        return axios.get(API_URL + 'all', { headers: authHeader()});
    }

    getDetailedMovieInfoFromApi(title) {
        return axios.get(API_URL + `searchTitle/${title}`, { headers: authHeader()})
    }

    rateMovie(id, data) {
        return axios.put(API_URL + `rateMovie/${id}` , data, { headers: authHeader()})
    }

    insertMovie(id, data) {
        return axios.post(API_URL + `insertMovie/${id}`, data, { headers: authHeader()})
    }

    edit(id, data) {
        return axios.put(API_URL + `updateMovie/${id}`, data, { headers: authHeader()});
    }

    delete(id) {
        return axios.delete(API_URL + `deleteMovie/${id}`, { headers: authHeader})
    }

    getUserAddedMovies() {
        return axios.get(API_URL + 'getMyMovies', {headers: authHeader()});
    }

}

export default new MovieService();