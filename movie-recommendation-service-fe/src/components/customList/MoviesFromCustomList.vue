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
                <button class="badge badge-danger mr-2" @click="removeFromList"> Remove from custom list </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../../axiosConfig';
import CustomListService from "@/services/customList.service.js";

export default {
    name: "MoviesFromCustomList",
    created() {
        let token = localStorage.getItem('token');
        axios.defaults.headers['Authorization'] = `Bearer ${token}`
        this.getMovies()
    },
    data() {
        return {
            movies: [],
            selectedList: this.$route.params.id,
            currentMovie: null,
            currentIndex: -1,
            title: "",
            customList:null,
            userId: localStorage.getItem('userId')
        }
    },

    methods: {
        getMovies(){
            CustomListService.getMoviesForSelectedList(this.selectedList)
            .then((response) => {
                this.movies = response.data;
                console.log(response.data)
            }).catch((error) => {
                console.log(error);
            })
        },

        removeFromList() {
            CustomListService.removeMovieFromCustomList(this.selectedList, this.currentMovie.movieId)
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
</style>