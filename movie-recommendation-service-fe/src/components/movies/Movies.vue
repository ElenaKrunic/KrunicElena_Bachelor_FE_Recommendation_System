<template>
    <div class="list row">
        <div class="col-md-8">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search by title"
                v-model="title" />
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="searchTitle"> Search </button>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <h4> Movies </h4>
            <ul class="list-group">
                <li class="list-group-item"
                    :class="{ active: index == currentIndex}"
                    v-for="(movie, index) in movies"
                    :key="index"
                    @click="setActiveMovie(movie, indx)"
                >
                    {{ movie.title }}
                </li>
            </ul>

            <button class="m-3 btn btn-sm btn-danger" @click="removeAllMovies"> Remove all </button>
        </div>
        <div class="col-md-6">
            <div v-if="currentMovie">
                <h4> Movie </h4>
                <div>
                    <label><strong> Title </strong></label> {{ currentMovie.title}}
                </div>
                <router-link :to="'/showMovieDetails/' + currentMovie.movieId" class="badne badge-warning"> Show movie details </router-link>
            </div>
            <div v-else>
            <br />
                <p> Please click on a movie...</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../../axiosConfig';
import MovieService from "@/services/movie.service.js";

export default {
    name : "Movies",
    created() {
        let token = localStorage.getItem('token');
        axios.defaults.headers['Authorization'] = `Bearer ${token}`
        this.getMovies()
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
        getMovies(){
            axios.
            get('/api/movies/all')
            .then((response) => {
                this.movies = response.data;
                console.log(response.data);               
        }).
            catch((error) => {
            console.log(error);
            this.errorMessage = 'Ne mogu vratiti podatke'
       })
    },

    refreshCustomList() {
        this.getMovies();
        this.currentMovie = null;
        this.currentIndex = -1; 
    },

    setActiveMovie(movie, index) {
        this.currentMovie = movie;
        this.currentIndex = movie ? index : -1;
    },

    searchTitle() {
       MovieService.findByTitle(this.title)
        .then(response => {
            this.movies = response.data; 
            this.setActiveMovie(null);
            console.log(response.data);
        }).
        catch(e => {
            console.log(e);
        })
    }
},
    
};
</script>

<style> 
.list {
    text-align : left; 
    max-width : 750px;
    margin : auto;
}

</style>