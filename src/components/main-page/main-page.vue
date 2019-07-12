<template>
  <b-container fluid class="h-100">
    <b-row>
      <b-col cols="12" class="bg-info">
        <Header>To-does</Header>
      </b-col>
    </b-row>
    <b-row class="h-100">
      <b-col cols="3" class="bg-light">
        <Sidebar
          v-bind:lists="lists"
          v-on:choose-list="changeCurrentList($event)"
          v-on:add-new-list="addNewList($event)"
        />
      </b-col>

      <b-col
        cols="5"
        class="bg-white border-left border-right border-light"
        v-if="currentList != null"
      >
        <Main
          v-model="currentList"
          v-on:choose-task="changeCurrentTask($event)"
          v-on:save-new-task="saveNewTask($event)"
          v-on:delete-task="deleteTask($event)"
          v-on:input="updateCurrentList"
          v-on:remove-todo-list="deleteCurrentList"
        />
      </b-col>

      <b-col cols="4" class="bg-light" v-if="currentTask !== null">
        <RightColumn
          v-bind:currenttask="currentTask"
          v-on:save-subtask="saveSubtask($event)"
          v-on:updateCurrentTask="updateCurrentTask"
          v-on:delete-subtask="deleteSubtask($event)"
        ></RightColumn>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import header from "./header/header";
import sidebar from "./sidebar/sidebar";
import main from "./main/main";
import rightColumn from "./right-column/right-column";

import axios from "axios";

export default {
  name: "app",
  components: {
    Header: header,
    Sidebar: sidebar,
    Main: main,
    RightColumn: rightColumn
  },
  data() {
    return {
      lists: null,
      currentList: null,
      currentTask: null
    };
  },
  methods: {
    showNotification(title, message) {
      this.$bvToast.toast(message, {
        title: title,
        toaster: "b-toaster-bottom-right",
        solid: true,
        appendToast: true,
        autoHideDelay: 5000
      });
    },
    changeCurrentList(listID) {
      this.currentList = this.lists.find(list => list._id === listID);
      this.currentTask = this.currentList.list[0];
    },
    changeCurrentTask(taskID) {
      this.currentTask = this.currentList.list.find(
        task => task._id === taskID
      );
    },
    saveSubtask(title) {
      this.currentTask.subTodo.push({
        completed: false,
        title
      });
    },
    updateCurrentTask() {
      if (!this.currentTask) return;
      const url = `https://todoes-list.herokuapp.com/todolist/${this.currentList._id}/todoitem/${this.currentTask._id}`;
      const token = localStorage.getItem("jwtToken");

      axios
        .put(url, this.currentTask, {
          headers: {
            authorization: `bearer ${token}`
          }
        })
        .then(response => {
          this.currentTask = response.data;
          this.showNotification(
            "Saved",
            "Your current task data has been saved!!!"
          );
        })
        .catch(error =>
          this.showNotification("Error", error.response.data.message)
        );
    },
    saveNewTask(title) {
      const url = `https://todoes-list.herokuapp.com/todolist/${this.currentList._id}/todoitem/`;
      const token = localStorage.getItem("jwtToken");
      const newTask = {
        title,
        description: "Default description",
        completed: false,
        expireDate: "1995-12-17T03:24:00",
        remindTime: "1995-12-17T03:24:00",
        note: "default note",
        subTodo: []
      };

      axios
        .post(url, newTask, {
          headers: {
            authorization: `bearer ${token}`
          }
        })
        .then(response => {
          this.currentTask = response.data;
          this.currentList.list.push(this.currentTask);
          this.showNotification(
            "Added",
            `Your task ${this.currentTask.title} is added and saved successfully!!!`
          );
        })
        .catch(error =>
          this.showNotification("Error", error.response.data.message)
        );
    },
    addNewList(name) {
      const newList = {
        name: name,
        description: "default description",
        list: [],
        owners: []
      };
      const url = `https://todoes-list.herokuapp.com/todolist/`;
      const token = localStorage.getItem("jwtToken");
      axios
        .post(url, newList, {
          headers: {
            authorization: `bearer ${token}`
          }
        })
        .then(response => {
          this.lists.push(response.data);
          this.showNotification(
            "Added",
            `To-do list ${response.data.name} is added and saved successfully!!!`
          );
        })
        .catch(error =>
          this.showNotification("Error", error.response.data.message)
        );
    },
    deleteSubtask(subtask_id) {
      const deleteIndex = this.currentTask.subTodo.findIndex(
        item => item._id === subtask_id
      );
      this.currentTask.subTodo.splice(deleteIndex, 1);
      this.updateCurrentTask();
    },
    deleteTask(task_id) {
      const url = `https://todoes-list.herokuapp.com/todolist/${this.currentList._id}/todoitem/${task_id}`;
      const token = localStorage.getItem("jwtToken");
      axios
        .delete(url, {
          headers: {
            authorization: `bearer ${token}`
          }
        })
        .then(response => {
          this.showNotification(
            "Removed",
            `Task ${response.data.title} is removed successfully`
          );
          const deleteIndex = this.currentList.list.findIndex(
            task => task._id === task_id
          );
          this.currentList.list.splice(deleteIndex, 1);
        })
        .catch(error =>
          this.showNotification("Error", error.response.data.message)
        );
    },
    updateCurrentList() {
      const url = `https://todoes-list.herokuapp.com/todolist/${this.currentList._id}`;
      const token = localStorage.getItem("jwtToken");
      axios
        .put(url, this.currentList, {
          headers: {
            authorization: `bearer ${token}`
          }
        })
        .then(response => {
          this.showNotification(
            "Updated!",
            "Your to-do list has been updated!"
          );
        })
        .catch(error =>
          this.showNotification("Error!", error.response.data.message)
        );
    },
    deleteCurrentList() {
      const url = `https://todoes-list.herokuapp.com/todolist/${this.currentList._id}`;
      const token = localStorage.getItem("jwtToken");
      axios
        .delete(url, {
          headers: {
            authorization: `bearer ${token}`
          }
        })
        .then(response => {
          this.showNotification(
            "Removed!",
            `Your to-do list ${this.currentList.name} has been removed!!!`
          );
          const removeIndex = this.lists.findIndex(
            list => list._id === this.currentList._id
          );
          this.lists.splice(removeIndex, 1);
          this.currentList = null;
          this.currentTask = null;
        })
        .catch(error =>
          this.showNotification("Error!", error.response.data.message)
        );
    }
  },
  mounted: function() {
    const url = "https://todoes-list.herokuapp.com/todolists";
    const token = localStorage.getItem("jwtToken");
    axios
      .get(url, {
        headers: {
          authorization: `bearer ${token}`
        }
      })
      .then(response => {
        this.lists = response.data;
        this.currentList = this.lists[0];
        this.currentTask = this.currentList.list[0];
      })
      .catch(error =>
        this.showNotification("Error", error.response.data.message)
      );
  }
};
</script>

<style scoped>
</style>
