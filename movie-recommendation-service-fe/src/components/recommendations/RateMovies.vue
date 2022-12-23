<template>
    <div>
        <form>
            <h4> Movie </h4>
            <div class="form-group">
                <label for="movieId"><strong> Id </strong></label>
                {{movieId}}
            </div>

            <div class="form-group">
                <label for="userId"><strong> userId </strong></label>
                {{userId}}
            </div>
          
        </form>
  
        <button type="submit" class="badge badge-success" @click="rateMovie"> Rate </button>
            
    </div>
</template>

<script>
import RatingService from "@/services/rating.service.js";

export default {
    name : "RateMovies",
    data() {
        return {
            userId: localStorage.getItem("userId"),
            movieId: localStorage.getItem("movieId"),
            movieRates: [
                {
                    movieId: localStorage.getItem("movieId"),
                    rate: this.$route.params.rate 
                }
            ]
        }
    },

    methods: {
        rateMovie() {
        var as = JSON.stringify(this.movieRates)
        console.log("as" + as);
        
        RatingService.rateMovie(this.userId, this.movieRates)
            .then(response => {
                console.log("uslo u try")
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }
    },
}
</script>