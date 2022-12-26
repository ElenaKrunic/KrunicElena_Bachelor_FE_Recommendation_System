<template>
    <div class="container">
      <header class="jumbotron">
        <h3>
          <strong>{{this.currentUser.username}}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Email:</strong>
        <input type="text" class="form-control" id="email" v-model="user.email"/>
      </p>

      <p>
        <strong>Last name</strong>
        <input type="text" class="form-control" id="lastName" v-model="user.lastName"/>
      </p>

      <p>
        <strong>First name</strong>
        <input type="text" class="form-control" id="firstName" v-model="user.firstName"/>
      </p>

      <p>
        <strong> Username </strong>
        <input type="text" class="form-control" id="username" v-model="user.username"/>
      </p>

      <button type="submit" class="badge badge-success" @click="saveChanges"> Save changes </button>
      
    </div>
  </template>
  
<script>
import UserService from "@/services/user.service.js";

  export default {
    name: 'Profile',
    created() {
      this.getUser()
    },
    data() {
      return {
        user: null,
        userId: localStorage.getItem("userId")
      };
    },

    methods: {
      getUser() {
        UserService.get(this.userId)
        .then(response => {
          this.user = response.data;
        })
        .catch(e => {
          console.log(e);
        })
      },

      saveChanges() {
        UserService.edit(this.userId, this.user)
          .then(response => {
            console.log(response.data);
            alert('Uspjesno izmijenjeni podaci o korisniku!');
          })
          .catch(e => {
            console.log(e);
          })
      }
    },
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      }
    },
    mounted() {
      if (!this.currentUser) {
        this.$router.push('/login');
      }
    }
  };
  </script>