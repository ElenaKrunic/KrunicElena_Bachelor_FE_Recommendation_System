import { createWebHistory, createRouter } from "vue-router";
import Login from "./components/user/Login.vue";
import Register from "./components/user/Register.vue";
import Movies from "./components/movies/Movies.vue";
import Movie from "./components/movies/Movie.vue";
import MovieDetailsFromApi from "./components/movies/MovieDetailsFromApi.vue";
import RateMovies from "./components/recommendations/RateMovies.vue";
import LeaveReview from "./components/recommendations/LeaveReview.vue"
import Recommendations from "./components/recommendations/Recommendations.vue";
import Watchlist from "./components/watchlist/Watchlist.vue";
import MoviesFromCustomList from "./components/customList/MoviesFromCustomList.vue";
import AddMovie from "./components/movies/AddMovie.vue";
import UserAddedMovies from "./components/movies/UserAddedMovies.vue";
import AdminBoard from "./components/user/AdminBoard.vue";
const Profile = () => import("./components/user/Profile.vue");
const AddCustomList = () => import("./components/customList/AddCustomList.vue")
const CustomLists = () => import("./components/customList/CustomLists.vue");
const CustomList = () => import("./components/customList/CustomList.vue");
import UserDetails from "./components/user/UserDetails.vue";
import EditOrDeleteUserAddedMovie from "./components/movies/EditOrDeleteUserAddedMovie.vue"
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
      path: "/userDetails/:id",
      component:UserDetails
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
    },
   
    {
      path:"/userAddedMovies",
      component: UserAddedMovies
    },
    {
      path:"/admin",
      component: AdminBoard
    },
    {
      path:"/showUserDetails/:id",
      component: UserDetails
    },
    {
      path:"/editOrDeleteUserAddedMovie/:id",
      component: EditOrDeleteUserAddedMovie
    }
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;