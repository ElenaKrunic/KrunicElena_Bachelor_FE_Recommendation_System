<template>
    <div v-if="currentCustomList" class="edit-form">
        <form>
            <h4> Custom list </h4>
            <div class="form-group">
                <label for="name"> Name </label>
                <input type="text" class="form-control" id="name" v-model="currentCustomList.name"/>
            </div>
            <div class="form-group">
                <label for="name"> Description </label>
                <input type="text" class="form-control" id="description" v-model="currentCustomList.description"/>
            </div>
        </form>

        <button class="badge badge-danger mr-2" @click="deleteCustomList"> Delete </button>
        <button type="submit" class="badge badge-success" @click="editCustomList"> Edit </button>
        <p> {{ message }}</p>
    </div>

    <div v-else>
        <br />
        <p> Click on custom list </p>
    </div>
</template>

<script>
import CustomListService from "@/services/customList.service.js";

export default {
    name : "CustomList",
    data() {
        return {
            currentCustomList: null,
            message : ''
        };
    },

    methods: {
    getCustomList(id) {
      CustomListService.get(id)
        .then(response => {
          this.currentCustomList = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    editCustomList() {
        CustomListService.edit(this.currentCustomList.customListId, this.currentCustomList)
            .then(response => {
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    },

    deleteCustomList() {
        CustomListService.delete(this.currentCustomList.customListId)
            .then(response => {
                console.log(response.data);
                this.$router.push({ name : "customLists"});
            })
            .catch(e => {
                console.log(e);
            });
        }
    },
    mounted() {
        this.getCustomList(this.$route.params.id);
    }
};

</script>

<style scoped>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>