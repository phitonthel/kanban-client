<template>
  <!-- REGISTER PAGE -->
  <div id="registerPage" class="container-fluid">
    <div class="loginRegisterRow row">
      <div class="registerContent col-4 rounded" style="background-color: aliceblue;">
        <h3>Register</h3>
        <form class="registerForm" v-on:submit.prevent="register">
          <div class="col-3 my-2">
            <input type="text" v-model="email" placeholder="Email">
          </div>
          <div class="col-3 my-2">
            <input type="password" v-model="password" placeholder="Password">
          </div>
          <div class="col-3 my-2">
            <button type="submit" class="btn btn-primary">Register</button>
          </div>
        </form>
        <!-- Login -->
        <div id="formFooter">
          Already have an account? <a id="login-btn" href="#" v-on:click.prevent="cdLogin">Login</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "RegisterPage",
  props: ['baseUrl'],
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    cdLogin() {
      this.$emit('changePage', 'login')
    },
    register() {
      axios({
        method: 'POST',
        url: this.baseUrl + '/register',
        data: {
          email: this.email,
          password: this.password
        }
      })
      .then((response) => {
        console.log('Register success! Your email: ' + response.data);
        this.email = ''
        this.password = ''
        this.$emit('newNotif', 'Register success!')
        this.$emit('changePage', 'login')
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