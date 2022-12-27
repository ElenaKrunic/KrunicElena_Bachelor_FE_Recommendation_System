<template>
    <div class="list-row">
        <div class="col-md-6">
            <h6> My movies </h6>
            {{this.movies}}
        </div>

    <button type="submit" class="badge badge-success" @click="editMovie"> Edit </button>
    <button type="submit" class="badge badge-danger mr-2" @click="deleteMovie"> Delete </button> 

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
            movies: []
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

        deleteMovie() {
        MovieService.delete(this.currentMovie.movieId)
            .then(response => {
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }


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