<template>
  <!-- cards -->
  <div class="card mb-2">
    <div class="card-body">
      <h5 class="card-title">{{task.User.email}}</h5>
      <p class="card-text">{{task.title}}</p>
      <div style="text-align: right;">
        <a href="#" class="btn-sm btn-primary" v-if="category !== 'Backlogs'" v-on:click.prevent="moveBackward(task.id)">Backward</a>
        <a href="#" class="btn-sm btn-danger" v-on:click.prevent="deleteTask(task.id)">Delete</a>
        <a href="#" class="btn-sm btn-success" v-if="category !== 'Done'" v-on:click.prevent="moveForward(task.id)">Forward</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'KanbanCard',
  props: ['category', 'task'],
  methods: {
    deleteTask(id) {
      this.$emit('deleteTask', id)
      console.log('deleteTask-Card', id);
    },
    moveBackward(id) {
      let payload = {id, category:this.category.toLowerCase()}
      this.$emit('moveBackward', payload)
    },
    moveForward(id) {
      let payload = {id, category:this.category.toLowerCase()}
      this.$emit('moveForward', payload)
    }
  }
}
</script>

<style>

</style>