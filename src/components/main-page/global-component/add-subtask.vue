<template>
  <div>
    <b-form inline @submit.prevent="saveSubtask">
      <span class="d-inline-block">
        <font-awesome-icon icon="plus" />
      </span>
      <b-input class="d-inline-block" size="sm" v-model="title" v-bind:placeholder="placeholder" />
    </b-form>
  </div>
</template>
<script>
export default {
  name: "add-subtask",
  props: ["placeholder", "eventname", "nullable"],
  data: function() {
    return {
      title: ""
    };
  },
  methods: {
    saveSubtask() {
      if (
        (this.nullable === 'false' && this.title.length > 0) ||
        this.nullable === 'true'
      ) {
        const event_name = this.eventname || 'saveSubTask';
        this.$emit(event_name, this.title);
        this.$nextTick(function() {
          this.title = "";
        });
      }
    }
  }
};
</script>
<style scoped>
</style>
