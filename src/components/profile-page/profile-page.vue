<template>
  <b-container fluid class="h-100">
    <b-row>
      <b-col cols="12" class="bg-info">
        <Header>To-does</Header>
      </b-col>
    </b-row>
    <b-row align-v="center" align-h="center">
      <b-col cols="4" class="bg-info">
        <h1>Profile</h1>
        <b-form @submit.prevent="handleUpdate" @reset.prevent="handleReset">
          <b-img-lazy
          center
          width="100"
          height="100"
          v-bind:src="user.avatar"
          fluid
          thumbnail
          class="d-inline-block align-top"
          v-bind:alt="user.username"
        >User</b-img-lazy>
          <b-form-group prepend="@" label="Username">
            <b-form-input
              v-model="user.username"
              type="text"
              required
              placeholder="Enter username"
              disabled
            />
          </b-form-group>

          <b-form-group label="Password">
            <b-form-input
              v-model="user.password"
              type="password"
              required
              placeholder="Enter password"
            />
          </b-form-group>

          <b-form-group label="Enter Confirm Password">
            <b-form-input
              v-model="user.repassword"
              type="password"
              required
              placeholder="Enter confirm password"
            />
          </b-form-group>

          <b-form-group label="Enter Email">
            <b-form-input v-model="user.email" type="email" required placeholder="Enter email" />
          </b-form-group>

          <b-form-group label="Enter avatar url">
            <b-form-input v-model="user.avatar" type="url" placeholder="Enter url of your avatar" />
          </b-form-group>

          <b-button type="submit" variant="primary">Update</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import header from '../main-page/header/header';
import axios from 'axios';
export default {
  name: 'profile-page',
  components: {
    Header: header
  },
  data() {
    return {
      user: JSON.parse(localStorage.getItem('userInfo'))
    };
  },
  methods: {
    showNotification(title, message) {
      this.$bvToast.toast(message, {
        title: title,
        toaster: 'b-toaster-bottom-right',
        solid: true,
        appendToast: true,
        autoHideDelay: 5000
      });
    },
    handleUpdate() {
      if (this.password !== this.repassword) {
        this.showNotification('Error', 'The confirm password must match password');
        return;
      }

      const url = `https://todoes-list.herokuapp.com/user/`;
      const token = localStorage.getItem('jwtToken');
      axios.put(url, this.user, {
        headers: {
          authorization: `bearer ${token}`,
        },
      })
      .then(response => {
        this.user = response.data;
        this.user.password = '';
        localStorage.setItem('userInfo', JSON.stringify(response.data));
      })
      .then(error => this.showNotification('Error', error.response.data.messsage));
    },
    handleReset() {
      this.user = JSON.parse(localStorage.getItem('userInfo'));
      this.user.password = '';
    },
    deleteUser() {
      const url = `https://todoes-list.herokuapp.com/user/`;
      const token = localStorage.getItem('jwtToken');
      axios.delete(url, {
        headers: {
          authorization: `bearer ${token}`,
        },
      })
      .then(response => {
        this.showNotification('Success', response.data.message);
      })
      .then(error => this.showNotification('Error', error.response.data.messsage));
    },
  },
  mounted() {
    this.user.password = '';
  }
};
</script>
<style scoped>
</style>
