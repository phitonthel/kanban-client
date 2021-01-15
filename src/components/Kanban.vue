<template>
  <!-- KANBAN CONTAINER -->
  <div class="container-fluid">
    <div class="row">
      <KanbanCategory
        v-for="(item, idx) in categories" :key="idx"
        v-bind:category="item"
        v-bind:color="colors[idx]"
        v-bind:tasks="tasks"
        @deleteTask="deleteTask"
        @moveBackward="moveBackward"
        @moveForward="moveForward"></KanbanCategory>
    </div>
  </div>
  <!-- # ENDS OF KANBAN CONTAINER -->
</template>

<script>
import KanbanCategory from './KanbanCategory'

export default {
  name: "Kanban",
  props: ['tasks'],
  data() {
    return {
      categories: ["Backlogs", "Developments", "Products", "Done"],
      colors: ['red', 'yellow', 'blue', 'green'],
    }
  },
  components: {
    KanbanCategory
  },
  methods: {
    deleteTask(id) {
      this.$emit('deleteTask', id)
    },
    moveBackward(payload) {
      this.$emit('moveBackward', payload)
    },
    moveForward(payload) {
      this.$emit('moveForward', payload)
    }
  },
  computed: {
    backlogs() {
      return this.tasks.filter(task => task.category === 'backlogs')
    },
    developments() {
      return this.tasks.filter(task => task.category === 'developments')
    },
    products() {
      return this.tasks.filter(task => task.category === 'products')
    },
    done() {
      return this.tasks.filter(task => task.category === 'done')
    },
  }
}
</script>

<style>

</style>