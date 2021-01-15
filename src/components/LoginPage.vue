<template>
  <!-- LOGIN PAGE -->
  <div id="loginPage" class="container-fluid">
    <div class="loginRegisterRow row">
      <div class="loginContent col-4 rounded" style="background-color: aliceblue;">
        <h3>Login</h3>
        <form class="loginForm" v-on:submit.prevent="login">
          <div class="col-3 my-2">
            <input type="text" v-model="email" placeholder="Email">
          </div>
          <div class="col-3 my-2">
            <input type="password" v-model="password" placeholder="Password">
          </div>
          <div class="col-3 my-2">
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </form>
        <!-- Google Login -->
        <div>Or sign in with Google:</div>
        <GoogleLogin :params="params" :onSuccess="onSuccess" :onFailure="onFailure">Login</GoogleLogin>
        <!-- Register -->
        <div id="formFooter">
          Don't have an account yet? <a id="register-btn" href="" v-on:click.prevent="cdRegister">Register</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import GoogleLogin from 'vue-google-login';

export default {
  name: "LoginPage",
  props: ['baseUrl', 'onFailure'],
  data() {
    return {
      email: '',
      password: '',
      params: {
        client_id: "880840563294-q52f5igbpervf0cej6vuo85fhla2mftm.apps.googleusercontent.com"
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      }
    }
  },
  components: {
    GoogleLogin
  },
  methods: {
    cdRegister() {
      this.$emit('changePage', 'register')
      this.$emit('newNotif', 'Redirected to registed page!')
    },
    login() {
      axios({
        method: 'POST',
        url: this.baseUrl + '/login',
        data: {
          email: this.email,
          password: this.password
        }
      })
      .then((response) => {
        localStorage.setItem('access_token', response.data.access_token)
        localStorage.setItem('user', this.email)
        this.$emit('changePage', 'kanban')
        this.$emit('newNotif', 'You are now logged in!')
        this.email = ''
        this.password = ''
      })
      .catch((err) => {
        console.log('errResp:', err);
        this.$emit('newNotif', err.response.data.message)
      })
    },
    onSuccess(googleUser) {
      console.log(googleUser);

      // This only gets the user information: id, name, imageUrl and email
      console.log(googleUser.getBasicProfile());
    },
  }
}
</script>

<style>

</style>