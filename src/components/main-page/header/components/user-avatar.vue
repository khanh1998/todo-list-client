<template>
  <b-navbar-nav class="ml-auto">
    <b-nav-item-dropdown right>
      <!-- Using 'button-content' slot -->
      <template slot="button-content">
        <b-img-lazy
          width="40"
          height="40"
          v-bind:src="user.avatar"
          fluid
          class="d-inline-block align-top"
          v-bind:alt="user.username"
        >User</b-img-lazy>
      </template>
      <b-dropdown-item href="profile">Profile</b-dropdown-item>
      <b-dropdown-item href="#" @click.prevent="logout">Log Out</b-dropdown-item>
    </b-nav-item-dropdown>
  </b-navbar-nav>
</template>

<script>
export default {
  name: 'user-avatar',
  methods: {
    logout() {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userInfo');
      this.$router.push('/login');
    }
  },
  data() {
    return {
      user: JSON.parse(localStorage.getItem('userInfo'))
    };
  }
};
</script>

<style scoped>
</style>