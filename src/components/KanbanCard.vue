<template>
  <!-- cards -->
  <div class="card mb-2">
    <div class="card-body">
      <h5 class="card-title">By: {{task.User.email}}</h5>
      <p class="card-text">
        {{task.title}}
        <a href="#" v-on:click.prevent="editForm"> &#128394; </a>
      </p>
      <!-- EDIT -->
      <div class="card-body" v-if="isEdit">
        <form>
          <div class="col-3 my-2">
            <input type="text" v-model="editTitle" placeholder="Title">
          </div>
          <div class="col-3 my-2">
            <button type="submit" class="btn-sm btn-dark" v-on:click.prevent="editTask(task.id)">Edit</button>
          </div>
        </form>
      </div>
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
  data() {
    return {
      isEdit: false,
      editTitle: ''
    }
  },
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
    },
    editForm() {
      if (this.isEdit) {
        this.isEdit = false
      }
      else {
        this.isEdit = true
      }
    },
    editTask(id) {
      console.log('Edit task: id='+id+', editTitle='+this.editTitle);

      //send to parent
      let payload = { id:id, editTitle:this.editTitle }
      this.$emit('editTask', payload)

      //reset
      this.editTitle = ''
      this.isEdit = false
    }
  }
}
</script>

<style>

</style>