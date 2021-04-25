<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <div
        class="column"
        v-for="(column, colIndex) of board.columns"
        :key="colIndex"
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
          <div
            class="task"
            v-for="(task, taskIndex) of column.tasks"
            :key="taskIndex"
            draggable
            @dragstart="pickupTask($event, taskIndex, colIndex)"
            @click="goToTask(task)"
            @dragover.prevent
            @dragenter.prevent
            @drop.stop="
              moveTaskOrCol($event, column.tasks, colIndex, taskIndex)
            "
          >
            <span class="w-full font-bold flex-no-shrink">
              {{ task.name }}
            </span>
            <p
              v-if="task.description"
              class="w-full mt-1 text-sm flex-no-whrink"
            >
              {{ task.description }}
            </p>
          </div>
        </div>
        <input
          type="text"
          class="block w-full p-2 bg-transparent"
          placeholder="+ Enter new task"
          @keyup.enter="createTask($event, column.tasks)"
        />
      </div>
    </div>

    <div class="task-bg" v-if="isTaskOpen" @click.self="close">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['board']),
    isTaskOpen () {
      return this.$route.name === 'task'
    }
  },
  methods: {
    goToTask (task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    },
    close () {
      this.$router.push({ name: 'board' })
    },
    createTask (e, tasks) {
      this.$store.commit('createTask', { tasks, name: e.target.value })
      e.target.value = ''
    },
    pickupTask (e, taskIndex, fromColIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('from-task-index', taskIndex)
      e.dataTransfer.setData('from-col-index', fromColIndex)
      e.dataTransfer.setData('type', 'task')
    },
    pickupCol (e, fromColIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('from-col-index', fromColIndex)
      e.dataTransfer.setData('type', 'column')
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

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}

.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}

.board {
  @apply p-4 bg-teal-dark h-full overflow-auto;
}

.task-bg {
  @apply pin absolute;
  background: rgba(0, 0, 0, 0.5);
}
</style>
