<template>
  <div class="home">
    <div class="container">
      <h1 class="text-center mb-4">TASK MANAGEMENT SYSTEM</h1>
      <task-list :key="taskListKey" />
      <task-form @taskAdded="updateTaskList" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import TaskList from '@/components/TaskList.vue';
import TaskForm from '@/components/TaskForm.vue';
@Options({
  components: {
    TaskForm,
    TaskList
  },
})
export default class HomeView extends Vue {
  taskListKey = 0;

  // Method to update task list
  updateTaskList() {
    // Increment the key to force re-rendering of TaskList component
    this.taskListKey++;
  }

}
</script>

<style lang="scss">
.home {
  display: flex;
  justify-content: center;
  /* Center horizontally */
  align-items: center;
  /* Center vertically */
  min-height: 100vh;
  /* Ensure the content fills the height of the viewport */
}

.container {
  max-width: 960px;
  /* Optional: Adjust the width of the container */
  width: 100%;
  /* Ensure the container takes full width */
  padding: 0 20px;
  /* Optional: Add padding */
}
</style>