import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:2235/api/watchlists/';

class WatchlistService {

    get(id) {
        return axios.get(API_URL + `${id}`, {headers:authHeader});
    }

    getMoviesFromWatchlist() {
        return axios.get(API_URL + 'principal/movies', { headers: authHeader()});
    }

    addInWatchlist(id, movieId) {
        return axios.put(API_URL + 'addMovieInWatchlist?userId=' + id + '&movieId=' + movieId, { headers: authHeader()}, id , { headers: authHeader()});
    }

    getWatchlistByUserId(id) {
        return axios.get(API_URL + `getWatchlistByUser/${id}`, {headers: authHeader()});
    }   

    removeMovieFromWatchlist(id, movieId) {
        return axios.delete(API_URL + `deleteMovieFromWatchlist/${id}/${movieId}`, {headers: authHeader()});
    }
}

export default new WatchlistService(); 

