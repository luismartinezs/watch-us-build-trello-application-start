<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <BoardColumn
        v-for="(column, colIndex) of board.columns"
        :key="colIndex"
        :column="column"
        :colIndex="colIndex"
        :board="board"
      />

      <div class="flex column">
        <input
          type="text"
          v-model="newColName"
          class="flex-grow p-2 mr-2"
          placeholder="New column name"
          @keyup.enter="createCol"
        />
      </div>
    </div>

    <div class="task-bg" v-if="isTaskOpen" @click.self="close">
      <router-view />
    </div>
  </div>
</template>

<script>
import BoardColumn from '@/components/BoardColumn'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      newColName: ''
    }
  },
  components: { BoardColumn },
  computed: {
    ...mapState(['board']),
    isTaskOpen () {
      return this.$route.name === 'task'
    }
  },
  methods: {
    close () {
      this.$router.push({ name: 'board' })
    },
    createCol () {
      this.$store.commit('createCol', { name: this.newColName })

      this.newColName = ''
    }
  }
}
</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}

.board {
  @apply p-4 bg-teal-dark h-full overflow-auto;
}

.task-bg {
  @apply pin absolute;
  background: rgba(0, 0, 0, 0.5);
}
</style>
