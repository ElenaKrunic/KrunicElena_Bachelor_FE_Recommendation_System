<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <div class="form-group">
                <label> Name </label>
                <input
                    type="text"
                    class="form-control"
                    id="name"
                    required 
                    v-model="customList.name"
                    name="name"
                />
            </div>

            <div class="form-group">
                <label> Description </label>
                <input
                    type="text"
                    class="form-control"
                    id="description"
                    required 
                    v-model="customList.description"
                    name="description"
                />
            </div>

            <button @click="saveCustomList" class="btn btn-success"> Submit </button>
        </div>

        <div v-else>
            <h4> New custom list successfully added! </h4>
            <button class="btn btn-success" @click="newCustomList"> Add </button>
        </div>
    </div>
</template>

<script>
import axios from '../../axiosConfig'; 
import CustomListService from "@/services/customList.service.js";

export default {
    name : "add-customList",
    created() {
        let accessToken = localStorage.getItem('accessToken');
        axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
    },
    data() {
        return {
            customList : {
                name : "",
                description: "",
                makeItPublic : false
            },
            submitted: false,
            userId : localStorage.getItem('userId')
        };
    },
    
    methods: {
        saveCustomList() {
            CustomListService.create(this.customList)
            .then(response => {
                console.log(response);
                alert('dodana nova custom list');
            })
            .catch(error => {
                console.log(error);
            })
        },

        newCustomList() {
            this.submitted = false; 
            this.customList = {};
            }
        }
    };
</script>

<style scoped>
.submit-form {
    max-width : 300px; 
    margin : auto;
}
</style>