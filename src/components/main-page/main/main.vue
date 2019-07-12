<template>
  <div>
    <MainHeader
      v-bind:value="value"
      v-on:input="handleTitleEdit($event)"
      v-on:input-description="handleDescriptionEdit($event)"
      v-on:remove-todo-list="$emit('remove-todo-list')"
    />

    <MainBody
      v-bind:value="value.list"
      v-on:choose-task="$emit('choose-task', $event)"
      v-on:save-new-task="$emit('save-new-task', $event)"
      v-on:delete-task="$emit('delete-task', $event)"
    />
  </div>
</template>
<script>
import mainHeader from './components/header/main-header';
import mainBody from './components/body/main-body';

export default {
  name: 'main',
  components: {
    MainHeader: mainHeader,
    MainBody: mainBody
  },
  props: ['value'],
  methods: {
    handleTitleEdit(title) {
      this.$props.value.name = title;
      this.$emit('input', this.$props.value);
    },
    handleDescriptionEdit(description) {
      this.$props.value.description = description;
      this.$emit('input', this.$props.value);
    }
  }
};
</script>
<style scoped>
</style>
