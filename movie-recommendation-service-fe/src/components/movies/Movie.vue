<template>
    <div v-if="currentMovie" class="edit-form">
        <form>
            <h4> Movie </h4>
            <div class="form-group">
                <label for="name"> Title </label>
                <input type="text" class="form-control" id="title" v-model="currentMovie.title"/>
            </div>
        </form>
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
            message : ''
        };
    },

    methods: {
    getMovie(id) {
      MovieService.get(id)
        .then(response => {
          this.currentMovie = response.data;
          console.log(this.currentMovie[0].title);
          //console.log(response.data);
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