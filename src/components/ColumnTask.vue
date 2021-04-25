<template>
  <div
    class="task"
    draggable
    @dragstart="pickupTask($event, taskIndex, colIndex)"
    @click="goToTask(task)"
    @dragover.prevent
    @dragenter.prevent
    @drop.stop="moveTaskOrCol($event, column.tasks, colIndex, taskIndex)"
  >
    <span class="w-full font-bold flex-no-shrink">
      {{ task.name }}
    </span>
    <p v-if="task.description" class="w-full mt-1 text-sm flex-no-whrink">
      {{ task.description }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true
    },
    taskIndex: {
      type: Number,
      required: true
    },
    colIndex: {
      type: Number,
      required: true
    },
    column: {
      type: Object,
      required: true
    },
    board: {
      type: Object,
      required: true
    }
  },
  methods: {
    goToTask (task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    },
    pickupTask (e, taskIndex, fromColIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('from-task-index', taskIndex)
      e.dataTransfer.setData('from-col-index', fromColIndex)
      e.dataTransfer.setData('type', 'task')
    },
    moveTaskOrCol (e, toTasks, toColIndex, toTaskIndex) {
      const type = e.dataTransfer.getData('type')
      if (type === 'task') {
        this.moveTask(
          e,
          toTasks,
          toTaskIndex !== undefined ? toTaskIndex : toTasks.length
        )
      } else {
        this.moveColumn(e, toColIndex)
      }
    },
    moveTask (e, toTasks, toTaskIndex) {
      const fromColIndex = e.dataTransfer.getData('from-col-index')
      const fromTaskIndex = e.dataTransfer.getData('from-task-index')
      const fromTasks = this.board.columns[fromColIndex].tasks

      this.$store.commit('moveTask', {
        fromTasks,
        toTasks,
        fromTaskIndex,
        toTaskIndex
      })
    },
    moveColumn (e, toColIndex) {
      const fromColIndex = e.dataTransfer.getData('from-col-index')

      this.$store.commit('moveColumn', {
        fromColIndex,
        toColIndex
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
