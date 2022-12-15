import axios from 'axios'

const instance = axios.create({
    baseURL:'http://localhost:2235',
    headers: {
        "Content-type" : "application/json"
    }
});

export default instance