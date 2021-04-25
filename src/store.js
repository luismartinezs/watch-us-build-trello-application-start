import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from './default-board'
import { saveStatePlugin, uuid } from './utils'

Vue.use(Vuex)

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

if (!JSON.parse(localStorage.getItem('board'))) {
  localStorage.setItem('board', JSON.stringify(board))
}

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board
  },
  getters: {
    getTask (state) {
      return id => {
        for (let column of state.board.columns) {
          for (let task of column.tasks) {
            if (task.id === id) {
              return task
            }
          }
        }
      }
    }
  },
  mutations: {
    createTask (state, { tasks, name }) {
      tasks.push({
        name,
        id: uuid(),
        description: ''
      })
    },
    createCol (state, { name }) {
      state.board.columns.push({ name, tasks: [] })
    },
    updateTask (state, { task, key, value }) {
      task[key] = value
      // Vue.set(task, key, value)
    },
    moveTask (state, { fromTasks, toTasks, fromTaskIndex, toTaskIndex }) {
      const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0]
      toTasks.splice(toTaskIndex, 0, taskToMove)
    },
    moveColumn (state, { fromColIndex, toColIndex }) {
      const colList = state.board.columns

      const colToMove = colList.splice(fromColIndex, 1)[0]
      colList.splice(toColIndex, 0, colToMove)
    }
  }
})
