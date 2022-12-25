<template>
    <div class="list row">
        <div class="col-md-6">
            <h4> Movies from watchlist </h4>
            {{this.watchlistMovies}}
        </div>
    </div>
</template>

<script>
import axios from '../../axiosConfig';
import WatchlistService from "@/services/watchlist.service.js";

export default {
    name : "Watchlist",
    created() {
        let token = localStorage.getItem('token');
        axios.defaults.headers['Authorization'] = `Bearer ${token}`
        this.getWatchlist()
    },
    data() {
        return {
            watchlistMovies : []
        }
    },
    methods: {
        getWatchlist() {
            WatchlistService.getMoviesFromWatchlist()
            .then((response) => {
                this.watchlistMovies = response.data;
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }
}

</script>

<style>
.list {
    text-align : left; 
    max-width : 750px;
    margin : auto;
}
</style>
