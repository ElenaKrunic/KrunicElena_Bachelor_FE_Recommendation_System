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
    </div>

    <div v-else>
        <br />
        <p> Click on a movie </p>
    </div>
</template>

<script>
import MovieService from "@/services/movie.service.js";

export default {
    name : "Movie",
    data() {
        return {
            currentMovie: null,
            message : '',
            userId: localStorage.getItem("userId"),
            rate: 0,
            review: '',
        };
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