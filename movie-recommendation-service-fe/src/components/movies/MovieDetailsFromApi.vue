<template>
    <div v-if="currentMovie" class="edit-form">
        <form>
            <h4> Movie </h4>
            <div class="form-group">
                <label for="title"><strong> Title </strong></label>
                {{currentMovie.title}}
            </div>
            <div class="form-group">
                <label for="plot"><strong> Plot </strong></label>
                {{currentMovie.plot}}
            </div>
            <div class="form-group">
                <label for="year"><strong> Year </strong></label>
                {{currentMovie.year}}
            </div>
            <div class="form-group">
                <label for="runtime"><strong> Runtime </strong></label>
                {{currentMovie.runtime}}
            </div>
            <div class="form-group">
                <label for="genre"><strong> Genre </strong></label>
                {{currentMovie.genre}}
            </div>
            <div class="form-group">
                <label for="director"><strong> Director </strong></label>
                {{currentMovie.director}}
            </div>
            <div class="form-group">
                <label for="writer"><strong> Writer </strong></label>
                {{currentMovie.writer}}
            </div>
            <div class="form-group">
                <label for="actors"><strong> Actors </strong></label>
                {{currentMovie.actors}}
            </div>
            <div class="form-group">
                <label for="language"><strong> Language </strong></label>
                {{currentMovie.language}}
            </div>
            <div class="form-group">
                <label for="country"><strong> Country </strong></label>
                {{currentMovie.country}}
            </div>
            <div class="form-group">
                <label for="awards"><strong> Awards </strong></label>
                {{currentMovie.awards}}
            </div>
            <div class="form-group">
                <image for="poster"><strong> Poster </strong></image>
                {{currentMovie.poster}}
            </div>
        </form>
    </div>

    <div v-else>
        <br />
        <p> otislo u else </p>
    </div>
</template>

<script>
import MovieService from "@/services/movie.service.js";

export default {
    name : "MovieDetails",
    data() {
        return {
            currentMovie: null,
            message: ''
        };
    },

    methods: {
        getDetailedMovieInfo(title) {
            MovieService.getDetailedMovieInfoFromApi(title)
                .then(response => {
                    this.currentMovie = response.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },
    },

    mounted() {
        this.getDetailedMovieInfo(this.$route.params.title);
    }
}
</script>

<style scoped>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>