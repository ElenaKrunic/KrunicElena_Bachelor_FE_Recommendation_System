import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:2235/api/watchlists/';

class WatchlistService {

    getMoviesFromWatchlist() {
        return axios.get(API_URL + 'principal/movies', { headers: authHeader()});
    }

    addInWatchlist(id, movieId) {
        return axios.put(API_URL + 'addMovieInWatchlist?userId=' + id + '&movieId=' + movieId, { headers: authHeader()}, id , { headers: authHeader()});
    }
}

export default new WatchlistService(); 

