import { createWebHistory, createRouter } from "vue-router";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
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
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;