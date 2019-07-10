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

      <b-col cols="5" class="bg-white border-left border-right border-light">
        <Main
          v-model="currentList"
          v-on:choose-task="changeCurrentTask($event)"
          v-on:save-new-task="saveNewTask($event)"
          v-on:delete-task="deleteTask($event)"
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
import header from "./components/header/header";
import sidebar from "./components/sidebar/sidebar";
import main from "./components/main/main";
import rightColumn from "./components/right-column/right-column";

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
        toaster: 'b-toaster-bottom-right',
        solid: true,
        appendToast: true
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
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMWVhMWU1MGFiODEyMDAxN2ZlNmVkZCIsInVzZXJuYW1lIjoia2hhbmgiLCJpYXQiOjE1NjIzODY4NTB9.I27XB6fdt5IpLnalpfKVAe7tpGBEdkrPRHr7g7aD5vk";

      axios
        .put(url, this.currentTask, {
          headers: {
            authorization: `bearer ${token}`
          }
        })
        .then(response => {
          this.currentTask = response.data;
        })
        .catch(error => alert(error.response.data.message));
    },
    saveNewTask(title) {
      const url = `https://todoes-list.herokuapp.com/todolist/${this.currentList._id}/todoitem/`;
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMWVhMWU1MGFiODEyMDAxN2ZlNmVkZCIsInVzZXJuYW1lIjoia2hhbmgiLCJpYXQiOjE1NjIzODY4NTB9.I27XB6fdt5IpLnalpfKVAe7tpGBEdkrPRHr7g7aD5vk";

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
        })
        .catch(error => alert(error.response.data.message));
    },
    addNewList(name) {
      const newList = {
        name: name,
        description: "default description",
        list: [],
        owners: []
      };
      const url = `https://todoes-list.herokuapp.com/todolist/`;
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMWVhMWU1MGFiODEyMDAxN2ZlNmVkZCIsInVzZXJuYW1lIjoia2hhbmgiLCJpYXQiOjE1NjIzODY4NTB9.I27XB6fdt5IpLnalpfKVAe7tpGBEdkrPRHr7g7aD5vk";
      axios
        .post(url, newList, {
          headers: {
            authorization: `bearer ${token}`
          }
        })
        .then(response => this.lists.push(response.data))
        .catch(error => alert(error.response.data.message));
    },
    deleteSubtask(subtask_id) {
      const deleteIndex = this.currentTask.subTodo.findIndex(
        item => item._id === subtask_id
      );
      this.currentTask.subTodo.splice(deleteIndex, 1);
      this.updateCurrentTask();
    },
    deleteTask(task_id) {
      const deleteIndex = this.currentList.list.findIndex(
        task => task._id === task_id
      );
      this.currentList.list.splice(deleteIndex, 1);
    }
  },
  mounted: function() {
    const url = "https://todoes-list.herokuapp.com/todolists";
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMWVhMWU1MGFiODEyMDAxN2ZlNmVkZCIsInVzZXJuYW1lIjoia2hhbmgiLCJpYXQiOjE1NjIzODY4NTB9.I27XB6fdt5IpLnalpfKVAe7tpGBEdkrPRHr7g7aD5vk";
    axios
      .get(url, {
        headers: {
          authorization: `bearer ${token}`
        }
      })
      .then(response => {
        this.lists = response.data;
        this.currentList = this.lists[1];
      })
      .catch(error => alert(error.response.data.message));
  }
};
</script>

<style scoped>
</style>
