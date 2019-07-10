<template>
  <div>
    <MainHeader
      v-bind:value="value"
      v-on:input="handleTitleEdit($event)"
      v-on:input-description="handleDescriptionEdit($event)"
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
      this.value.name = title;
      this.$emit('input', this.value);
    },
    handleDescriptionEdit(description) {
      this.value.description = description;
      this.$emit('input', this.value);
    }
  }
};
</script>
<style scoped>
</style>
