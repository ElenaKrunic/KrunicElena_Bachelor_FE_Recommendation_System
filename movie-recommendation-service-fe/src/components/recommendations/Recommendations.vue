<template>
    <div class="list row">
        
        <div class="col-md-6">
            <h4> Recommended movies </h4>
            <ul class="list-group">
                <li class="list-group-item"
                    :class="{ active: index == currentIndex}"
                    v-for="(movie, index) in recommended"
                    :key="index"
                    @click="setActiveMovie(movie, indx)"
                >
                    {{ movie.title }}
                </li>
            </ul>

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

export default {
    name : "RecommendedMovies",
    created() {
        let token = localStorage.getItem('token');
        axios.defaults.headers['Authorization'] = `Bearer ${token}`
        this.getRecommendedMovies()
    },
    data() {
        return {
            recommended: [],
            currentMovie: null,
            currentIndex: -1,
            userId: localStorage.getItem('userId')
        }
    },

    methods: {
        getRecommendedMovies() {
        axios.get('api/movies/recommended?userId=' + this.userId)
        .then((response) => {
            this.recommended = response.data;
            console.log(response.data);
        }).catch((error) => {
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