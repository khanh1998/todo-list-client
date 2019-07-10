<template>
  <b-navbar-nav class="ml-auto">
    <b-nav-item-dropdown right>
      <!-- Using 'button-content' slot -->
      <template slot="button-content">
        <img src="https://placekitten.com/g/30/30" class="d-inline-block align-top" alt="Kitten" />
      </template>
      <b-dropdown-item href="#">Profile</b-dropdown-item>
      <b-dropdown-item href="#">Sign Out</b-dropdown-item>
    </b-nav-item-dropdown>
  </b-navbar-nav>
</template>

<script>
export default {};
</script>

<style scoped>
</style>