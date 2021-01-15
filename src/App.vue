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
      v-bind:tasks="this.tasks"
      @deleteTask="deleteTask"
      @moveBackward="moveBackward"
      @moveForward="moveForward"></Kanban>
    <AddTask
      v-if="currentPage == 'addTask'"
      v-bind:baseUrl="baseUrl"
      v-on:changePage="changePage"></AddTask>
  </div>
</template>

<script>
import axios from "axios"

import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import Kanban from './components/Kanban'
import Navbar from './components/Navbar'
import AddTask from './components/AddTask'

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
    AddTask
  },
  methods: {
    changePage(page) {
      this.getTasks()
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
    },
    deleteTask(id) {
      console.log('deleteTask-App.vue');
      axios({
        method: 'DELETE',
        url: this.baseUrl + '/tasks/' + id,
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then((response) => {
        console.log(response.data);
        this.getTasks()
      })
      .catch((err) => {
        console.log(err);
      })
    },
    moveBackward(payload) {
      console.log('App.vue', payload);
      let id = payload.id
      let currentCategory = payload.category
      let nextCategory = ''

      // determine which category
      if (currentCategory == 'developments') {
        nextCategory = 'backlogs'
      }
      else if (currentCategory == 'products') {
        nextCategory = 'developments'
      }
      else if (currentCategory == 'done') {
        nextCategory = 'products'
      }

      //database
      axios({
        method: 'PATCH',
        url: this.baseUrl + '/tasks/' + id,
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          category: nextCategory
        }
      })
      .then((response) => {
        console.log(response.data);
        this.getTasks()
      })
      .catch((err) => {
        console.log(err);
      })
    },
    moveForward(payload) {
      console.log('App.vue', payload);
      let id = payload.id
      let currentCategory = payload.category
      let nextCategory = ''

      // determine which category
      if (currentCategory == 'backlogs') {
        nextCategory = 'developments'
      }
      else if (currentCategory == 'developments') {
        nextCategory = 'products'
      }
      else if (currentCategory == 'products') {
        nextCategory = 'done'
      }

      //database
      axios({
        method: 'PATCH',
        url: this.baseUrl + '/tasks/' + id,
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          category: nextCategory
        }
      })
      .then((response) => {
        console.log(response.data);
        this.getTasks()
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