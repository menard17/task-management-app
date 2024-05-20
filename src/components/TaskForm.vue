<template>
    <b-form @submit.prevent="addTask" class="mt-3">
      <b-form-group label="Enter Task Name">
        <b-form-input v-model.trim="newTaskTitle" type="text" placeholder="Enter task name"></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Add Task</b-button>
      <b-alert v-if="successMessage" variant="success" dismissible @dismissed="resetAlert">{{ successMessage }}</b-alert>
    </b-form>
  </template>
  
  <script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  import { useStore } from 'vuex';
  
  @Options({})
  export default class TaskForm extends Vue {
    store = useStore();
    newTaskTitle = '';
    successMessage = '';
  
    async addTask() {
      if (this.newTaskTitle.trim()) {
        await this.store.dispatch('TaskModule/createTask', { title: this.newTaskTitle.trim(), description: '' });
        this.newTaskTitle = '';
        this.successMessage = 'Task added successfully!';
        this.$emit('taskAdded');
      }
    }
  
    resetAlert() {
      this.successMessage = '';
    }
  }
  </script>
  