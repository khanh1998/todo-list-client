<template>
  <a class="" @click="$emit('choose-list', listID)">
    <span class="text-danger">
      <font-awesome-icon icon="clipboard-list" />
    </span>
    <span class="d-inline-block text-dark">
      <h6>{{ name }}</h6>
    </span>
    <span class="float-right text-warning">
      <i>{{ size }}</i>
    </span>
  </a>
</template>

<script>
export default {
  name: "list",
  props: ["name", "size", "listID"]
};
</script>

<style scoped>
</style>
