<template>
  <!-- KANBAN CONTAINER -->
  <div class="container-fluid">
    <div class="row">
      <KanbanCategory
        v-for="(item, idx) in categories" :key="idx"
        v-bind:category="item"></KanbanCategory>
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
      colors: ['red', 'yellow', 'blue', 'green']
    }
  },
  components: {
    KanbanCategory
  },
  computed: {
    backlogs() {
      return this.tasks.filter(task => task.category === 'Backlogs')
    },
    developments() {
      return this.tasks.filter(task => task.category === 'Developments')
    },
    products() {
      return this.tasks.filter(task => task.category === 'Products')
    },
    done() {
      return this.tasks.filter(task => task.category === 'Done')
    },
  }
}
</script>

<style>

</style>