<template>
  <!-- BACKLOGS -->
  <div class="col-3 p-3">
    <div class="red px-3 pb-3 pt-1 rounded kanban-category">
      <h3>{{ category }}</h3>
      <div class="kanban-cards overflow-auto"> 
        <KanbanCard></KanbanCard>
      </div>
    </div>
  </div>
</template>

<script>
import KanbanCard from './KanbanCard'

export default {
  name: "KanbanCategory",
  props: ['category'],
  data() {
    return {

    }
  },
  components: {
    KanbanCard
  }
}
</script>

<style>

</style>