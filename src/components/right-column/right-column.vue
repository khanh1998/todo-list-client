<template>
  <div>
    <TaskDetails
      v-bind:currenttask="currenttask"
      v-on:save-subtask="$emit('save-subtask', $event)"
      v-on:delete-subtask="$emit('delete-subtask', $event)"
    />
    <b-button @click="$emit('updateCurrentTask')">Update</b-button>
  </div>
</template>

<script>
import taskDetails from "./task-details/task-details";

export default {
  name: "right-column",
  components: {
    TaskDetails: taskDetails
  },
  props: ["currenttask"]
};
</script>

<style scoped>
</style>