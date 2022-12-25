<template>
    <div class="list row">
        <div class="col-md-6">
            <h4> Movies from this list </h4>
            {{this.movies}}
        </div>
    </div>
</template>

<script>
import axios from '../../axiosConfig';
import CustomListService from "@/services/customList.service.js";

export default {
    name: "MoviesFromCustomList",
    created() {
        let token = localStorage.getItem('token');
        axios.defaults.headers['Authorization'] = `Bearer ${token}`
        this.getMovies()
    },
    data() {
        return {
            movies: [],
            selectedList: this.$route.params.id
        }
    },

    methods: {
        getMovies(){
            CustomListService.getMoviesForSelectedList(this.selectedList)
            .then((response) => {
                this.movies = response.data;
                console.log(response.data)
            }).catch((error) => {
                console.log(error);
            })
        }
    }
}
</script>

<style>
</style>