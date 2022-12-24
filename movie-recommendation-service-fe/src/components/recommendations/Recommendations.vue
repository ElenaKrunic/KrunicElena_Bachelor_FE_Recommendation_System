<template>
    <div class="list row">
        
        <div class="col-md-6">
            <h4> Recommended movies </h4>
            {{this.recommended}}
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
            //var data = JSON.parse(response.data); 
            //console.log(data);
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