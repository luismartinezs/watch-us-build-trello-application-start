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
import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin'

export default {
  props: {
    task: {
      type: Object,
      required: true
    },
    taskIndex: {
      type: Number,
      required: true
    }
  },
  mixins: [movingTasksAndColumnsMixin],
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
    }
  }
}
</script>

<style lang="scss" scoped></style>
