<template>
    <div v-if="currentMovie" class="edit-form">
        <form>
            <h4> Movie </h4>
            <div class="form-group">
                <label for="title"><strong> Title </strong></label>
                <input type="text" class="form-control" id="title" v-model="currentMovie.title"/>
                {{currentMovie.title}}
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

        <div class="col-md-6">
            <h6>Custom lists of logged user</h6>
            <ul class="list-group">
                <li class="list-group-item"
                    :class="{ active: index == currentIndex}"
                    v-for="(customList, index) in customLists"
                    :key="index"
                    @click="setActiveCustomList(customList, indx)"
                >
                    {{ customList.name }}
                </li>
            </ul>

        </div>
        <div class="col-md-6">
            <div v-if="currentCustomList">
                <h4> Custom list  </h4>
                <div>
                    <label><strong> Name </strong></label> {{ currentCustomList.name}}
                </div>
                 
                <button type="submit" class="badge badge-success" @click="addMovieToSelectedList"> add to {{currentCustomList.name}} list </button>

            </div>
            <div v-else>
            <br />
            </div>
        </div>
        <button type="submit" class="badge badge-success" @click="addToCustomList"> Add to custom list </button>

        <button type="submit" class="badge badge-success" @click="addInWatchlist"> Add to watchlist </button>

        <li v-if="showEditOrDeleteMovieButtonAccordingToRole" class="nav-item">
            <button type="submit" class="badge badge-success" @click="editMovie"> Edit </button>
            <button type="submit" class="badge badge-danger mr-2" @click="deleteMovie"> Delete </button>            
        </li> 

    </div>
    <div v-else>
        <p> uslo u else </p>
    </div>
</template>

<script>
import axios from '../../axiosConfig';
import MovieService from "@/services/movie.service.js";
import WatchlistService from "@/services/watchlist.service.js";
import CustomListService from "@/services/customList.service.js";

export default {
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },

        showEditOrDeleteMovieButtonAccordingToRole() {
        if(this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_ADMIN');
      } 

      return false;
    },
    },
    name : "Movie",
    data() {
        return {
            currentMovie: null,
            currentCustomList: null,
            customLists: [],
            message : '',
            rate: 0,
            review: '',
            userId: localStorage.getItem("userId"),           
        };
    },
    created() {
        let token = localStorage.getItem('token');
        axios.defaults.headers['Authorization'] = `Bearer ${token}`
        this.showEditOrDeleteMovieButtonAccordingToUser()
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
    },

    addMovieToSelectedList() {
        CustomListService.addMovieToSelectedList(this.currentCustomList.customListId,this.$route.params.id)
        .then(response => {
            console.log(this.currentCustomList.customListId)
            console.log(response);
        })
    },

    addToCustomList() {
        axios.
            get('/api/customLists/userCustomList')
            .then((response) => {
                this.customLists = response.data;
                console.log(response.data);               
        }).
            catch((error) => {
            console.log(error);
            this.errorMessage = 'Ne mogu vratiti podatke'
       })
    },

    setActiveCustomList(customList, index) {
        this.currentCustomList = customList;
        this.currentIndex = customList ? index : -1;
    },

    editMovie() {
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