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

    getDetailedMovieInfoFromApi(title) {
        return axios.get(API_URL + `searchTitle/${title}`, { headers: authHeader()})
    }

    rateMovie(id, data) {
        return axios.put(API_URL + `rateMovie/${id}` , data, { headers: authHeader()})
    }

}

export default new MovieService();