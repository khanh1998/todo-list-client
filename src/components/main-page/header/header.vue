<template>
  <b-navbar type="dark" variant="info">
    <sidebar-toggle-button/>
    <app-title><slot></slot></app-title>
    <search-box/>
    <user-avatar/>
  </b-navbar>
</template>


<script>
import apptitle  from './components/app-title';
import searchbox from './components/search-box';
import sidebartogglebutton from './components/sidebar-toggle-button';
import useravatar from './components/user-avatar';

export default {
  components: {
    'app-title': apptitle,
    'search-box': searchbox,
    'sidebar-toggle-button': sidebartogglebutton,
    'user-avatar': useravatar,
  }
};
</script>

<style scoped>
</style>
