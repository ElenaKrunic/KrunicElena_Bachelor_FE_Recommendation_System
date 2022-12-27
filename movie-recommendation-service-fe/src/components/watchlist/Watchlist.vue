<template>
    <div class="list row">
        <div class="col-md-6">
            <h4> Movies from watchlist </h4>
            <ul class="list-group">
                <li class="list-group-item"
                    :class="{ active: index == currentIndex}"
                    v-for="(movie, index) in movies"
                    :key="index"
                    @click="setActiveMovie(movie,indx)"
                >
                    {{ movie.title }}
                </li>
            </ul>
        </div>
        <div class="col-md-6">
            <div v-if="currentMovie">  
                <h4> Movie </h4>
                <div>
                    <label><strong>Title</strong></label> {{currentMovie.title}}
                </div>
                <router-link :to="'/showMovieDetails/' + currentMovie.movieId" class="badne badge-warning"> Show movie details </router-link>
                <button class="badge badge-danger mr-2" @click="removeFromList"> Remove from watchlist </button>
            </div>
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
        this.getMoviesFromWatchlist()
        this.getWatchlistInfo()
    },
    data() {
        return {
            movies : [],
            currentMovie: null,
            currentIndex: -1,
            title: "",
            watchlist: null,
            userId: localStorage.getItem('userId')
        }
    },
    methods: {
        getMoviesFromWatchlist() {
            WatchlistService.getMoviesFromWatchlist()
            .then((response) => {
                this.movies = response.data;
            })
            .catch((error) => {
                console.log(error);
            })
        },

        getWatchlistInfo() {
            WatchlistService.getWatchlistByUserId(this.userId)
            .then((response) => {
                this.watchlist = response.data;
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
        },

        removeFromList() {
            WatchlistService.removeMovieFromWatchlist(this.watchlist.watchlistId, this.currentMovie.movieId)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
        },

        setActiveMovie(movie, index) {
        this.currentMovie = movie;
        this.currentIndex = movie ? index : -1;
    },
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
