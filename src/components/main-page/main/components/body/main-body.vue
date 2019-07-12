<template>
  <div>
    <ListTask
      v-bind:list="value"
      v-on:choose-task="$emit('choose-task', $event)"
      v-on:delete-task="$emit('delete-task', $event)"
    />
    <AddTask
      v-on:save-new-task="$emit('save-new-task', $event)"
      placeholder="Title of new task"
      nullable="false"
      eventname="save-new-task"
    />
  </div>
</template>
<script>
import listTask from "./list-task";
import addTask from "../../../global-component/add-subtask";

export default {
  name: "main-body",
  components: {
    ListTask: listTask,
    AddTask: addTask
  },
  props: ["value"]
};
</script>
<style scoped>
</style>
