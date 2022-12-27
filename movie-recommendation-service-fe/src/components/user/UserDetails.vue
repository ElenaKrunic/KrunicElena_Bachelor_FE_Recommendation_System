<template>
    <div v-if="currentUser" class="edit-form">
           <form>
               <h4> User </h4>
               <div class="form-group">
                   <label for="username"> Username </label>
                   <input type="text" class="form-control" id="username" v-model="currentUser.username"/>
               </div>
               <div class="form-group">
                   <label for="email"> Email </label>
                   <input type="text" class="form-control" id="email" v-model="currentUser.email"/>
               </div>
           </form>
   
           <button type="submit" class="badge badge-success" @click="editUser"> Edit </button>
           <button class="badge badge-danger mr-2" @click="deleteUser"> Deactivate account </button>
           <p> {{ message }}</p>
       </div>
   
       <div v-else>
           <br />
           <p> Click on custom list </p>
       </div>
   </template>
   
<script>
import UserService from "@/services/user.service.js";
   
   export default {
    currentUser() {
        return this.$store.state.auth.user;
    },
       name: "User",
       data() {
           return {
               currentUser: null,
               message: ''
           };
       },
   
       methods: {
           getUser(id) {
               UserService.get(id)
               .then(response => {
                   this.currentUser = response.data; 
                   console.log(response.data);
               })
               .catch(e => {
                   console.log(e);
               })
           },
   
           editUser(){
               UserService.edit(this.currentUser.userId, this.currentUser)
               .then(response => {
                   console.log(response.data);
               })
               .catch(e => {
                   console.log(e);
               })
           },
   
           deleteUser() {
               UserService.delete(this.currentUser.userId)
               .then(response => {
                   console.log(response.data);
                   this.$router.push({ name: "admin"})
               })
               .catch(e => {
                   console.log(e);
               });
           }
       },
       mounted() {
           this.getUser(this.$route.params.id);
       }
   }
</script>
   
<style scoped>
   
</style>