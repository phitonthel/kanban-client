<template>
  <div>
    <Navbar
      v-on:changePage="changePage"></Navbar>
    <LoginPage 
      v-if="currentPage == 'login'"
      v-bind:baseUrl="baseUrl"
      v-on:changePage="changePage"></LoginPage>
    <RegisterPage
      v-if="currentPage == 'register'"
      v-bind:baseUrl="baseUrl"
      v-on:changePage="changePage"></RegisterPage>
    <Kanban
      v-if="currentPage == 'kanban'"
      v-bind:tasks="this.tasks"></Kanban>
  </div>
</template>

<script>
import axios from "axios"
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import Kanban from './components/Kanban'
import Navbar from './components/Navbar'

export default {
  name: "App",
  data() {
    return {
      currentPage: '',
      baseUrl: 'http://localhost:3000',
      tasks: []
    }
  },
  components: {
    Navbar,
    LoginPage,
    RegisterPage,
    Kanban,
  },
  methods: {
    changePage(page) {
      this.currentPage = page
    },
    checkAuth() {
      if (localStorage.access_token) {
      this.getTasks()
      this.currentPage = 'kanban'
      console.log('login');
    }
    else {
      this.currentPage = 'login'
      console.log('not login');
    }
    },
    getTasks() {
      axios({
        method: 'GET',
        url: `${this.baseUrl}/tasks`,
        headers : {
          access_token: localStorage.access_token
        }
      })
      .then((response) => {
        //response.data includes the User email and without createdAd/updatedAt attributes
        this.tasks = response.data
      })
      .catch((err) => {
        console.log(err);
      })
    }
  },
  created() {
    this.checkAuth()
  }
}
</script>

<style>

</style>