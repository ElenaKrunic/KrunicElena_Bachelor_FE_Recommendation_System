<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <div class="form-group">
                <label> Title </label>
                <input
                    type="text"
                    class="form-control"
                    id="title"
                    required 
                    v-model="movie.title"
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
                    v-model="movie.genre"
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
                    v-model="movie.actors"
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
                    v-model="movie.awards"
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
                    v-model="movie.country"
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
                    v-model="movie.director"
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
                    v-model="movie.language"
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
                    v-model="movie.plot"
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
                    v-model="movie.poster"
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
                    v-model="movie.runtime"
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
                    v-model="movie.writer"
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
                    v-model="movie.year"
                    name="year"
                />
            </div>

            <button @click="saveMovie" class="btn btn-success"> Submit </button>
        </div>

        <div v-else>
            <h4> New movie successfully added! </h4>
            <button class="btn btn-success" @click="newMovie"> Add </button>
        </div>
    </div>
</template>

<script> 
import MovieService from "@/services/movie.service.js";
import axios from '../../axiosConfig';

export default {
    name : "AddMovie",
    created() {
        let accessToken = localStorage.getItem('accessToken');
        axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
    },
    data() {
        return {
            movie : {
                title : "",
                genre : "",
                actors: "",
                awards: "",
                country: "",
                director: "",
                language: "",
                plot: "",
                poster: "",
                runtime: "",
                writer: "",
                year: 0
            },
            submitted: false,
            userId : localStorage.getItem('userId')
        };
    },
    
    methods: {
        saveMovie() {
            MovieService.insertMovie(this.userId, this.movie)
            .then(response => {
                console.log(response);
                alert('New movie added!');
            })
            .catch(error => {
                console.log(error);
            })
        },

        newMovie() {
            this.submitted = false; 
            this.movie = {};
            }
        }
    };
</script>

<style scoped>
.submit-form {
    max-width : 300px; 
    margin : auto;
}
</style>