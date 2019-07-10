<template>
  <div>
    <span class v-show="!showEdit" @click="showEditFunc">{{ value || '--empty--' }}</span>
    
    <div v-if="tag === 'textarea'">
      <b-textarea v-show="showEdit" ref="textinput" v-model="value" @blur="saveInput($event)" />
    </div>
    <div v-else-if="tag === 'checkbox'">
      <b-checkbox v-show="showEdit" ref="textinput" v-model="value" @blur="saveInput($event)" />
    </div>
    <div v-else>
      <b-input v-show="showEdit" ref="textinput" v-model="value" @blur="saveInput($event)" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'edit-by-click',
  props: ['value', 'tag', 'nullable'],
  methods: {
    showEditFunc() {
      this.showEdit = true;
      this.$nextTick(function() {
        this.$refs.textinput.focus();
      });
    },
    saveInput() {
      const newValue = this.$refs.textinput.value;
      if ((newValue.length > 0 && this.nullable === 'false') || this.nullable === 'true') {
        this.$emit('input', newValue);
        this.showEdit = false;
        return;
      }
    }
  },
  data() {
    return {
      showEdit: false
    };
  }
};
</script>
<style scoped>
</style>
