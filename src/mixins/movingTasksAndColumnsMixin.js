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
