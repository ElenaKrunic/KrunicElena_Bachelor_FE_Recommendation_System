import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:2235/api/admin';

class AdminService {

    getAdminBoard() {
        return axios.get(API_URL + '/getBoard' , { headers: authHeader() });
    }
}

export default new AdminService();