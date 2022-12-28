<template>
    <div class="list row">
        <div class="col-md-6">
            <h4> My added movies </h4>
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
                <div>
                    <router-link :to="'/editOrDeleteUserAddedMovie/' + currentMovie.movieId" class="badne badge-warning"> Edit </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../../axiosConfig';
import MovieService from "@/services/movie.service.js";

export default {
    name: "MyMovies",
    created() {
        let token = localStorage.getItem('token');
        axios.defaults.headers['Authorization'] = `Bearer ${token}`
        this.getUserAddedMovies()
    },

    data() {
        return {
            movies: [],
            currentMovie: null,
            currentIndex: -1,
            title: ""
        }
    },

    methods: {

        getUserAddedMovies() {
            MovieService.getUserAddedMovies()
            .then((response) => {
                this.movies = response.data; 
                console.log(response.data);
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

<style scoped>
.list {
    text-align : left; 
    max-width : 750px;
    margin : auto;
}
</style>