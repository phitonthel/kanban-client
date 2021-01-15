<template>
  <!-- ADD TASK -->
  <div id="addTask" class="container-fluid">
    <div class="loginRegisterRow row">
      <div class="col-4 rounded" style="background-color: aliceblue;">
        <h3>Add Task</h3>
        <form class="registerForm" v-on:submit.prevent="register">
          <div class="col-3 my-2">
            <input type="text" v-model="title" placeholder="Title">
          </div>
          <div class="col-3 my-2">
            <label for="category"></label>
            <select v-model="category" id="category">
              <option value="backlogs">Backlogs</option>
              <option value="developments">Developments</option>
              <option value="products">Products</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div class="col-3 my-2">
            <button type="submit" class="btn btn-primary" v-on:click.prevent="addTask">Add</button>
          </div>
        </form>
        <div id="formFooter">
          <a id="" href="#" v-on:click.prevent="changePage('kanban')">Cancel</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AddTask',
  props: ['baseUrl'],
  data() {
    return {
      title: '',
      category: 'backlogs'
    }
  },
  methods: {
    changePage(page) {
      this.$emit('changePage', page)
    },
    addTask() {
      axios({
        method: 'POST',
        url: this.baseUrl + '/tasks',
        data: {
          title: this.title,
          category: this.category
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then((response) => {
        console.log(response.data);
        this.title = ''
        this.$emit('changePage', 'kanban')
        this.$emit('newNotif', response.data.message)
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }
}
</script>

<style>

</style>