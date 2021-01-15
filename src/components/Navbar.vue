<template>
<!-- NAVBAR -->
  <nav class="nav">
    <h1 style="color: antiquewhite;">-Kanban!</h1>
    <h2 style="color: antiquewhite;">{{notif}}</h2>
    <div>
      <a style="color: antiquewhite;"> {{ user }} </a>
      <a href="#" class="btn btn-primary my-2" id="btn-addTask" 
        v-on:click="addTask"
        v-if="isLogin == true">Add Task</a>
      <a href="#" class="btn btn-danger m-2" id="btn-logout" v-on:click="logout">Logout</a>
    </div>
  </nav>
</template>
<script>
export default {
  name: "Navbar",
  props: ['notif', 'isLogin', 'user'],
  methods: {
    logout() {
      localStorage.clear()
      this.$emit('changePage', 'login')
      this.$emit('newNotif', 'Logged out!')
      this.$emit('changeUser', '')
    },
    addTask() {
      this.$emit('changePage', 'addTask')
    }
  },
}
</script>

<style>

</style>