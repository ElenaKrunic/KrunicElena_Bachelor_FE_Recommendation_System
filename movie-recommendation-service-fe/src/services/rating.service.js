import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:2235/api/movieRatesAndReviews/';

class RatingService {

    rateMovie(id, data) {
        console.log("id u servisu je" + id);
        console.log("data u servisu je" + data);
        return axios.put(API_URL + `rateMovie/${id}`, data, { headers: authHeader()});
    }
}

export default new RatingService();