<template>
  <div>
    <b-container fluid class="h-100">
      <b-row align-v="center" align-h="center">
        <b-col cols="4" class="bg-info mt-5">
          <h1>Login</h1>
          <b-form @submit.prevent="handleLogin" @reset.prevent="handleReset">
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
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
            <b-button variant="outline-primary"><b-link href="Register">Register</b-link></b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "login-page",
  data() {
    return {
      username: "",
      password: ""
    };
  },
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
    handleLogin() {
      const url = "https://todoes-list.herokuapp.com/login";
      axios
        .post(url, {
          username: this.username,
          password: this.password
        })
        .then(response => {
          this.getUserInfo(this.username).then(() => {
            this.handleReset();
            const token = response.data.jwtToken;
            localStorage.setItem("jwtToken", token);
            if (localStorage.getItem("jwtToken") != null) {
              this.$emit("loggedIn");
              if (this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl);
              } else {
                this.$router.push("/");
              }
            }
          });
        })
        .catch(error => console.log(error));
    },
    handleReset() {
      this.username = "";
      this.password = "";
    },
    getUserInfo(username) {
      const url = `https://todoes-list.herokuapp.com/user/${username}`;
      return axios
        .get(url)
        .then(response =>
          localStorage.setItem("userInfo", JSON.stringify(response.data))
        )
        .catch(error =>
          this.showNotification("Error!!!", error.response.data.message)
        );
    }
  }
};
</script>
<style scoped>
</style>
