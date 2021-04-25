<template>
  <div
    class="column"
    draggable
    @dragstart.self="pickupCol($event, colIndex)"
    @drop="moveTaskOrCol($event, column.tasks, colIndex)"
    @dragover.prevent
    @dragenter.prevent
  >
    <div class="flex items-center mb-2 font-bold">
      {{ column.name }}
    </div>
    <div class="list-reset">
      <ColumnTask
        v-for="(task, taskIndex) of column.tasks"
        :key="taskIndex"
        :task="task"
        :taskIndex="taskIndex"
        :colIndex="colIndex"
        :column="column"
        :board="board"
      />
    </div>
    <input
      type="text"
      class="block w-full p-2 bg-transparent"
      placeholder="+ Enter new task"
      @keyup.enter="createTask($event, column.tasks)"
    />
  </div>
</template>

<script>
import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin'
import ColumnTask from '@/components/ColumnTask'
export default {
  components: {
    ColumnTask
  },
  mixins: [movingTasksAndColumnsMixin],
  methods: {
    createTask (e, tasks) {
      this.$store.commit('createTask', { tasks, name: e.target.value })
      e.target.value = ''
    },
    pickupCol (e, fromColIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('from-col-index', fromColIndex)
      e.dataTransfer.setData('type', 'column')
    }

  }
}
</script>

<style lang="css">
.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
</style>
