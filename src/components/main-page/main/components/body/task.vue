<template>
  <div>
    <b-checkbox class="d-inline-block" v-model="data.completed" />
    <b-link href="#" @click="$emit('choose-task', data._id)">
      <span class="d-inline-block">{{ data.title }}</span>
    </b-link>
    <b-link class="text-danger" @click="$emit('delete-task', data._id)">
      <span>
        <font-awesome-icon icon="backspace" />
      </span>
    </b-link>
  </div>
</template>
<script>
export default {
  name: "task",
  props: ["data"]
};
</script>
<style scoped>
</style>
