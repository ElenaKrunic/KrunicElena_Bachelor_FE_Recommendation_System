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
  
        <button type="submit" class="badge badge-success" @click="leaveReview"> Leave review </button>
            
    </div>
</template>

<script>
import ReviewService from "@/services/review.service.js";

export default {
    name : "LeaveReview",
    data() {
        return {
            userId: localStorage.getItem("userId"),
            movieId: localStorage.getItem("movieId"),
            movieReviews: [
                {
                    movieId: localStorage.getItem("movieId"),
                    review: this.$route.params.review
                }
            ]
        }
    },

    methods: {
        leaveReview() {
            ReviewService.leaveReview(this.userId, this.movieReviews)
                .then(response => {
                    console.log("uslo u try za review")
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                })
        }
    }
}
</script>

<style scoped>

</style>