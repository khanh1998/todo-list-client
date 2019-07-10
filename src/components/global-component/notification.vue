<template>
  <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
      <img v-bind:src="img-url" class="rounded mr-2" alt="Notification Image" />
      <strong class="mr-auto">{{ title }}</strong>
      <small>{{ timeMessage }}</small>
      <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="toast-body">{{ message }}</div>
  </div>
</template>
<script>
export default {
  name: 'notification',
  props: ['title', 'milliseconds', 'message', 'img-url'],
  computed: {
    'timeMessage': function() {
      const currentMilliseconds = Date.now();
      return (currentMilliseconds - milliseconds) + ' seconds ago';
    }
  }
};
</script>
<style scoped>
</style>
