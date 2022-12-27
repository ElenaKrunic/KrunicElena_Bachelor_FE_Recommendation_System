<template>
    <div class="col-md-8">
        <div class="col-md-6">
            <h4>Users</h4>
            <ul class="list-group">
                <li class="list-group-item"
                    :class="{ active: index == currentIndex}"
                    v-for="(user, index) in users"
                    :key="index"
                    @click="setActiveUser(user, indx)"
                >
                    {{ user.username }}
                </li>
            </ul>
        </div>
        <div class="col-md-6">
            <div v-if="currentUser">
                <h4> User </h4>
                <div>
                    <label><strong> Username </strong></label> {{ currentUser.username}}
                </div>
                <div>
                    <label><strong> Email </strong></label> {{ currentUser.email}}
                </div>
                <router-link :to="'/showUserDetails/' + currentUser.userId" class="badne badge-warning"> Show user details </router-link>
            </div>
            <div v-else>
            <br />
                <p> Please click on a user</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../../axiosConfig';
import UserService from "@/services/user.service.js";

export default {
    name: "Users",
    created() {
        let token = localStorage.getItem('token');
        axios.defaults.headers['Authorization'] = `Bearer ${token}`
        this.getUsers()
    },
    data() {
        return {
            users: [],
            currentUser: null,
            currentIndex: -1, 
            username: ""
        }
    },

    methods: {
        getUsers() {
            UserService.getUsers()
            .then((response) => {
                this.users = response.data;
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
        },

        setActiveUser(user, index) {
            this.currentUser = user; 
            this.currentIndex = user ? index : -1;
        }
    }
}
</script>

<style> 
.list {
    text-align : left; 
    max-width : 750px;
    margin : auto;
}

</style>