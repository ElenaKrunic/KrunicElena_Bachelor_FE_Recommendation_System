import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:2235/api/movieRatesAndReviews/';

class ReviewService {

    leaveReview(id, data) {
        return axios.put(API_URL + `leaveReview/${id}`, data, {headers: authHeader()});
    }
}

export default new ReviewService();