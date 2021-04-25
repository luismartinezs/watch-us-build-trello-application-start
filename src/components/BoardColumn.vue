<template>
  <AppDrop @drop="moveTaskOrCol">
    <AppDrag
      class="column"
      :transferData="{
        type: 'column',
        fromColIndex: colIndex
      }"
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
    </AppDrag>
  </AppDrop>
</template>

<script>
import AppDrag from '@/components/AppDrag'
import AppDrop from '@/components/AppDrop'
import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin'
import ColumnTask from '@/components/ColumnTask'
export default {
  components: {
    ColumnTask,
    AppDrag,
    AppDrop
  },
  mixins: [movingTasksAndColumnsMixin],
  methods: {
    createTask (e, tasks) {
      this.$store.commit('createTask', { tasks, name: e.target.value })
      e.target.value = ''
    },
    pickupCol (e, fromColIndex) {
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
