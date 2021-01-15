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

export default {
  name: "LoginPage",
  props: ['baseUrl'],
  data() {
    return {
      email: '',
      password: ''
    }
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
        this.email = ''
        this.password = ''
        this.$emit('changePage', 'kanban')
        this.$emit('newNotif', 'You are now logged in!')
      })
      .catch((err) => {
        console.log('errResp:', err);
        this.$emit('newNotif', err.response.data.message)
      })
    }
  }
}
</script>

<style>

</style>