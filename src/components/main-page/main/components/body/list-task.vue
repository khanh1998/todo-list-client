<template>
  <div>
    <Task
      v-for="task in list"
      v-bind:key="task._id"
      v-bind:data="task"
      v-on:choose-task="$emit('choose-task', $event)"
      v-on:delete-task="$emit('delete-task', $event)"
    />
  </div>
</template>
<script>
import task from "./task";
export default {
  name: "list-task",
  components: {
    Task: task
  },
  props: ["list"]
};
</script>
<style scoped>
</style>
