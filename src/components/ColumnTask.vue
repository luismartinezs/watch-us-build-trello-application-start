<template>
  <AppDrop @drop="moveTaskOrCol">
    <AppDrag
      class="task"
      :transferData="{
        type: 'task',
        fromColIndex: colIndex,
        fromTaskIndex: taskIndex
      }"
      @click="goToTask(task)"
    >
      <span class="w-full font-bold flex-no-shrink">
        {{ task.name }}
      </span>
      <p v-if="task.description" class="w-full mt-1 text-sm flex-no-whrink">
        {{ task.description }}
      </p>
    </AppDrag>
  </AppDrop>
</template>

<script>
import AppDrag from '@/components/AppDrag'
import AppDrop from '@/components/AppDrop'
import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin'

export default {
  components: {
    AppDrag,
    AppDrop
  },
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
    }
  }
}
</script>

<style lang="scss" scoped></style>
