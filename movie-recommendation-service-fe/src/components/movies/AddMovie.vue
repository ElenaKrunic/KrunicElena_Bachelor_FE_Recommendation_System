<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <div class="form-group">
                <label> Id </label>
                <input
                    type="number"
                    class="form-control"
                    id="id"
                    required 
                    v-model="movie.movieId"
                    name="id"
                />
            </div>
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

            <button @click="saveMovie" class="btn btn-success"> Submit </button>
        </div>

        <div v-else>
            <h4> New movie successfully added! </h4>
            <button class="btn btn-success" @click="newMovie"> Add </button>
        </div>
    </div>
</template>

<script>
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
                genre : ""
            },
            submitted: false,
            userId : localStorage.getItem('userId')
        };
    },
    
    methods: {
        saveMovie() {
            axios
            .post('/api/movies/insertMovie/', this.movie)
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