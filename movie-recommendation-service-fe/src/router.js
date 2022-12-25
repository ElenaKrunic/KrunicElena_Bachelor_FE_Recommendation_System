import { createWebHistory, createRouter } from "vue-router";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Movies from "./components/movies/Movies.vue";
import Movie from "./components/movies/Movie.vue";
import MovieDetailsFromApi from "./components/movies/MovieDetailsFromApi.vue";
import AddMovie from "./components/movies/AddMovie.vue";
import RateMovies from "./components/recommendations/RateMovies.vue";
import LeaveReview from "./components/recommendations/LeaveReview.vue"
import Recommendations from "./components/recommendations/Recommendations.vue";
import Watchlist from "./components/watchlist/Watchlist.vue";
import MoviesFromCustomList from "./components/customList/MoviesFromCustomList.vue";
const Profile = () => import("./components/Profile.vue");
const AddCustomList = () => import("./components/customList/AddCustomList.vue")
const CustomLists = () => import("./components/customList/CustomLists.vue");
const CustomList = () => import("./components/customList/CustomList.vue");

const routes = [
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/register",
      component: Register,
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
    },
    {
      path: "/customLists",
      name : "customLists",
      component: CustomLists
    },
    {
      path : "/addCustomList",
      name : "addCustomList",
      component: AddCustomList
    },
    {
      path : "/editCustomLists/:id",
      component : CustomList
    },
    {
      path: "/movies",
      component: Movies
    },
    {
      path: "/showMovieDetails/:id",
      component: Movie
    },
    {
      path: "/requestDetailedMovieInfo/:title",
      component: MovieDetailsFromApi
    },
    {
      path: "/rateMovie/:rate",
      component:RateMovies
    },
    {
      path: "/leaveReview/:review",
      component:LeaveReview
    },
    {
      path: "/addMovie",
      component: AddMovie
    },
    {
      path: "/recommendations",
      component: Recommendations
    },
    {
      path: "/watchlist",
      component: Watchlist
    },
    {
      path:"/moviesFromList/:id",
      component: MoviesFromCustomList
    }
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;