<template>
  <div>
    <Sidebar-header />
    <Sidebar-main
      v-bind:lists="lists"
      v-on:choose-list="$emit('choose-list', $event)"
      v-on:add-new-list="$emit('add-new-list', $event)"
    />
    <Sidebar-footer />
  </div>
</template>

<script>
import sidebarmain from "./components/sidebar-main";
import sidebarheader from "./components/sidebar-header";
import sidebarfooter from "./components/sidebar-footer";

export default {
  name: "sidebar",
  components: {
    "Sidebar-main": sidebarmain,
    "Sidebar-header": sidebarheader,
    "Sidebar-footer": sidebarfooter
  },
  props: ["lists"]
};
</script>

<style scoped>
</style>
