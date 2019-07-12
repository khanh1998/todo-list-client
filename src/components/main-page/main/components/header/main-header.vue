<template>
  <b-navbar type="white" variant="white">
    <b-navbar-brand>
      <Edit-By-Click v-bind:value="value.name" nullable="false" @input="$emit('input', $event)" />
    </b-navbar-brand>
    <Edit-By-Click
      v-bind:value="value.description"
      nullable="true"
      @input="$emit('input-description', $event)"
    />
    <b-button @click="$emit('remove-todo-list')">
      <font-awesome-icon icon="trash" />
    </b-button>
  </b-navbar>
</template>
<script>
import editByClick from "../../../global-component/edit-by-click";

export default {
  name: "main-header",
  props: ["value"],
  components: {
    "Edit-By-Click": editByClick
  },
  methods: {}
};
</script>
<style scoped>
</style>
