<template>
  <div>
    <b-container fluid class="h-100">
      <b-row align-v="center" align-h="center">
        <b-col cols="4" class="bg-info mt-5">
          <h1>Register</h1>
          <b-form @submit.prevent="handleRegister" @reset.prevent="handleReset">
            <b-form-group prepend="@" label="Username">
              <b-form-input v-model="username" type="text" required placeholder="Enter username" />
            </b-form-group>

            <b-form-group label="Password">
              <b-form-input
                v-model="password"
                type="password"
                required
                placeholder="Enter password"
              />
            </b-form-group>

            <b-form-group label="Enter Confirm Password">
              <b-form-input
                v-model="repassword"
                type="password"
                required
                placeholder="Enter confirm password"
              />
            </b-form-group>

            <b-form-group label="Enter Email">
              <b-form-input v-model="email" type="email" required placeholder="Enter email" />
            </b-form-group>

            <b-form-group label="Enter avatar url">
              <b-form-input v-model="avatar" type="url" placeholder="Enter url of your avatar" />
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "register-page",
  methods: {
    showNotification(title, message) {
      this.$bvToast.toast(message, {
        title: title,
        toaster: "b-toaster-bottom-right",
        solid: true,
        appendToast: true,
        autoHideDelay: 5000
      });
    },
    handleRegister() {
      if (this.password !== this.repassword)
        this.showNotification(
          "Error",
          "The confirm password must match password!"
        );
      const url = "https://todoes-list.herokuapp.com/user";
      axios
        .post(url, {
          'username': this.username,
          'password': this.password,
          'avatar': this.avatar,
          'email': this.email,
        })
        .then(response => {
          this.showNotification(
            "Create account successfully!!!",
            `Account ${response.data.username} is created!!!`
          );
          this.$router.push("/login");
        })
        .catch(error =>
          this.showNotification("Error", error.response.data.message)
        );
    },
    handleReset() {
      this.username = "";
      this.password = "";
      this.repassword = "";
      this.avatar = "";
      this.email = "";
    }
  },
  data() {
    return {
      username: "",
      password: "",
      avatar: "",
      email: ""
    };
  }
};
</script>
<style scoped>
</style>
