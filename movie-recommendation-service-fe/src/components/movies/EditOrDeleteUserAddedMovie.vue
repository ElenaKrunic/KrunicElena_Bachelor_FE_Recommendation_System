<template>
    <div v-if="currentMovie" class="edit-form">
        <form>
            <h4> Movie </h4>
            <div class="form-group">
                <label for="title"> Title </label>
                <input
                    type="text"
                    class="form-control"
                    id="title"
                    required 
                    v-model="currentMovie.title"
                    name="title"
                />
            </div>

            <div class="form-group">
                <label> Genre </label>
                <input
                    type="text"
                    class="form-control"
                    id="genre"
                    required 
                    v-model="currentMovie.genre"
                    name="genre"
                />
            </div>
            <div class="form-group">
                <label> Actors </label>
                <input
                    type="text"
                    class="form-control"
                    id="actors"
                    required 
                    v-model="currentMovie.actors"
                    name="actors"
                />
            </div>

            <div class="form-group">
                <label> Awards </label>
                <input
                    type="text"
                    class="form-control"
                    id="awards"
                    required 
                    v-model="currentMovie.awards"
                    name="awards"
                />
            </div>

            <div class="form-group">
                <label> Country </label>
                <input
                    type="text"
                    class="form-control"
                    id="country"
                    required 
                    v-model="currentMovie.country"
                    name="country"
                />
            </div>

            <div class="form-group">
                <label> Director </label>
                <input
                    type="text"
                    class="form-control"
                    id="director"
                    required 
                    v-model="currentMovie.director"
                    name="director"
                />
            </div>

            <div class="form-group">
                <label> Language </label>
                <input
                    type="text"
                    class="form-control"
                    id="language"
                    required 
                    v-model="currentMovie.language"
                    name="language"
                />
            </div>

            <div class="form-group">
                <label> Plot </label>
                <input
                    type="text"
                    class="form-control"
                    id="plot"
                    required 
                    v-model="currentMovie.plot"
                    name="plot"
                />
            </div>

            <div class="form-group">
                <label> Poster </label>
                <input
                    type="text"
                    class="form-control"
                    id="poster"
                    required 
                    v-model="currentMovie.poster"
                    name="poster"
                />
            </div>

            <div class="form-group">
                <label> Runtime </label>
                <input
                    type="text"
                    class="form-control"
                    id="runtime"
                    required 
                    v-model="currentMovie.runtime"
                    name="runtime"
                />
            </div>

            <div class="form-group">
                <label> Writer </label>
                <input
                    type="text"
                    class="form-control"
                    id="writer"
                    required 
                    v-model="currentMovie.writer"
                    name="writer"
                />
            </div>

            <div class="form-group">
                <label> Year </label>
                <input
                    type="number"
                    class="form-control"
                    id="year"
                    required 
                    v-model="currentMovie.year"
                    name="year"
                />
            </div>
        </form>
        <button type="submit" class="badge badge-success" @click="editMovie"> Edit </button>
        <button type="submit" class="badge badge-danger mr-2" @click="deleteMovie"> Delete </button> 
    </div>
</template>

<script>
import MovieService from "@/services/movie.service.js";

export default {
    name: "EditOrDeleteUserAddedMovie",
    data() {
        return {
            currentMovie: null,
            message: ''
        };
    },

    methods: {
        getMovie(id)  {
            MovieService.get(id)
            .then(response => {
                this.currentMovie = response.data;
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        },

        editMovie(){
            MovieService.edit(this.currentMovie.movieId, this.currentMovie)
                .then(response => {
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },

        deleteMovie() {
            MovieService.delete(this.currentMovie.movieId)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({name: "userAddedMovies"})
                })
                .catch(e => {
                    console.log(e);
                })
        },
    },

    mounted() {
            this.getMovie(this.$route.params.id);
        }
}


</script>

<style>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>