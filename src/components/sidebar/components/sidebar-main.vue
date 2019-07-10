<template>
  <b-nav vertical>
    <b-nav-item
      v-b-tooltip.hover
      v-for="list in lists"
      v-bind:key="list._id"
      v-bind:title="list.description"
      aria-controls="v-pills-home"
      aria-selected="true"
    >
      <List
        v-bind:name="list.name"
        v-bind:size="list.list.length"
        v-bind:listID="list._id"
        v-on:choose-list="$emit('choose-list', $event)"
      />
    </b-nav-item>
    <b-nav-item>
      <AddList
        placeholder="Title of new list"
        eventname="add-new-list"
        nullable="false"
        v-on:add-new-list="$emit('add-new-list', $event)"
      />
    </b-nav-item>
  </b-nav>
</template>

<script>
import list from "./list";
import addList from "../../global-component/add-subtask";

export default {
  name: "sidebar-main",
  components: {
    List: list,
    AddList: addList
  },
  props: ["lists"]
};
</script>

<style scoped>
</style>
