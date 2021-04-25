export default {
  props: {
    column: {
      type: Object,
      required: true
    },
    colIndex: {
      type: Number,
      required: true
    },
    board: {
      type: Object,
      required: true
    }
  },
  methods: {
    moveTaskOrCol (transferData) {
      if (transferData.type === 'task') {
        this.moveTask(transferData)
      } else {
        this.moveColumn(transferData)
      }
    },
    moveTask ({ fromColIndex, fromTaskIndex }) {
      const fromTasks = this.board.columns[fromColIndex].tasks

      this.$store.commit('moveTask', {
        fromTasks,
        fromTaskIndex,
        toTasks: this.column.tasks,
        toTaskIndex: this.taskIndex
      })
    },
    moveColumn ({ fromColIndex }) {
      this.$store.commit('moveColumn', {
        fromColIndex,
        toColIndex: this.colIndex
      })
    }
  }
}
