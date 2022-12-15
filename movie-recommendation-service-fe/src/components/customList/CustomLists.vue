<template>
    <div class="list row">
        <div class="col-md-8">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search by name"
                v-model="name" />
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="searchName"> Search </button>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <h4>Custom lists</h4>
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

            <button class="m-3 btn btn-sm btn-danger" @click="removeAllCustomLists"> Remove all </button>
        </div>
        <div class="col-md-6">
            <div v-if="currentCustomList">
                <h4> Custom list </h4>
                <div>
                    <label><strong> Name </strong></label> {{ currentCustomList.name}}
                </div>
                <div>
                    <label><strong> Description </strong></label> {{ currentCustomList.description}}
                </div>

                <router-link :to="'/editCustomLists/' + currentCustomList.customListId" class="badne badge-warning"> Edit </router-link>
            </div>
            <div v-else>
            <br />
                <p> Please click on a custom list...</p>
                <router-link to="/addCustomList" class="nav-link"> Add custom list </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../../axiosConfig';
import CustomListService from "@/services/customList.service.js";

export default {
    name : "CustomLists",
    created() {
        let token = localStorage.getItem('token');
        axios.defaults.headers['Authorization'] = `Bearer ${token}`
        this.getUserCustomLists()
    },
    data() {
        return {
            customLists: [],
            currentCustomList: null,
            currentIndex: -1,
            name: ""
        }
    },
    methods: {
        getUserCustomLists(){
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

    refreshCustomList() {
        this.getUserCustomLists();
        this.currentCustomList = null;
        this.currentIndex = -1; 
    },

    setActiveCustomList(customList, index) {
        this.currentCustomList = customList;
        this.currentIndex = customList ? index : -1;
    },

    removeAllCustomLists() {
        CustomListService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshCustomList();
            }).
            catch(e => {
                console.log(e);
            })
    },

    searchName() {
       CustomListService.findByName(this.name)
        .then(response => {
            this.customLists = response.data; 
            this.setActiveCustomList(null);
            console.log(response.data);
        }).
        catch(e => {
            console.log(e);
        })
    }
},
    
};
</script>

<style> 
.list {
    text-align : left; 
    max-width : 750px;
    margin : auto;
}

</style>