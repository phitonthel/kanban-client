<template>
<!-- NAVBAR -->
  <nav class="nav">
    <h1 style="color: antiquewhite;">-Kanban!</h1>
    <h2 style="color: antiquewhite;">notifications/errors</h2>
    <div>
      <a href="#" class="btn btn-primary my-2" id="btn-addTask">Add Task</a>
      <a href="#" class="btn btn-danger m-2" id="btn-logout" v-on:click="logout">Logout</a>
    </div>
  </nav>
</template>
<script>
export default {
  name: "Navbar",
  methods: {
    logout() {
      localStorage.clear()
      this.$emit('changePage', 'login')
    }
  }
}
</script>

<style>

</style>