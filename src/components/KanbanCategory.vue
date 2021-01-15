<template>
  <!-- BACKLOGS -->
  <div class="col-3 p-3">
    <div class="px-3 pb-3 pt-1 rounded kanban-category" v-bind:class="color">
      <h3>{{ category }}</h3>
      <div class="kanban-cards overflow-auto"> 
        <KanbanCard 
          v-for="(item, idx) in filteredTask" :key="idx"
          v-bind:category="category"
          v-bind:task="item"
          @deleteTask="deleteTask"
          @moveBackward="moveBackward"
          @moveForward="moveForward"></KanbanCard>
      </div>
    </div>
  </div>
</template>

<script>
import KanbanCard from './KanbanCard'

export default {
  name: "KanbanCategory",
  props: ['category', 'color', 'tasks'],
  data() {
    return {

    }
  },
  components: {
    KanbanCard
  },
  methods: {
    deleteTask(id) {
      console.log('deleteTask-Category', id);
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
    filteredTask() {
      return this.tasks.filter(task => task.category.toLowerCase() == this.category.toLowerCase())
    },
  }
}
</script>

<style>

</style>