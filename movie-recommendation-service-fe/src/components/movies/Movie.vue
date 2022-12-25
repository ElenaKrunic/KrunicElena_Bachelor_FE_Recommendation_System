<template>
    <div v-if="currentMovie" class="edit-form">
        <form>
            <h4> Movie </h4>
            <div class="form-group">
                <label for="title"><strong> Title </strong></label>
                {{currentMovie.title}}
            </div>
            <div class="form-group">
                <label for="movieId"><strong> MovieId </strong></label>
                {{currentMovie.movieId}}
            </div>
        </form>

        <div>
            <p> {{rate}}</p>
            <input type="number" class="form-control" v-model="rate" id="rate"/>
            <router-link :to="'/rateMovie/' + rate" class="badne badge-warning"> Rate this movie </router-link>
        </div>
        <div>
            <p> {{review}}</p>
            <input type="text" class="form-control" v-model="review" id="review"/>
            <router-link :to="'/leaveReview/' + review" class="badne badge-warning"> Leave a review </router-link>
        </div>
        <div>
            <input type="text" class="form-control" v-model="currentMovie.title"/>
            <router-link :to="'/requestDetailedMovieInfo/' + currentMovie.title" class="badne badge-warning"> Request detailed information about movie </router-link>
        </div>

        <button type="submit" class="badge badge-success" @click="addInWatchlist"> Add to watchlist </button>

    </div>

    <div v-else>
        <br />
        <p> Click on a movie </p>
    </div>
</template>

<script>
import axios from '../../axiosConfig';
import MovieService from "@/services/movie.service.js";
import WatchlistService from "@/services/watchlist.service.js";

export default {
    name : "Movie",
    data() {
        return {
            currentMovie: null,
            message : '',
            rate: 0,
            review: '',
            userId: localStorage.getItem("userId"),
        };
    },
    created() {
        let token = localStorage.getItem('token');
        axios.defaults.headers['Authorization'] = `Bearer ${token}`
    },
    methods: {
    
    getMovie(id) {
      MovieService.get(id)
        .then(response => {
          this.currentMovie = response.data;
          localStorage.setItem('movieId', this.currentMovie.movieId);
        })
        .catch(e => {
          console.log(e);
        });
    },

    addInWatchlist() {
        WatchlistService.addInWatchlist(this.userId, this.$route.params.id)
        .then(response => {
            console.log(this.userId)
            console.log(response);
        })
        .catch(e => {
            console.log(e);
        })
    }

    },
    mounted() {
        this.getMovie(this.$route.params.id);
    }
};

</script>

<style scoped>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>