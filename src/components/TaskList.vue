<template>
    <div>
        <b-container>
            <b-input-group class="mb-3">
                <b-form-input v-model="searchQuery" type="text" placeholder="Search tasks"></b-form-input>
            </b-input-group>
            <ul class="list-group">
                <li v-for="task in filteredTasks" :key="task.id"
                    class="list-group-item d-flex justify-content-between align-items-center">
                    {{ task.title }}
                    <b-button-group>
                        <b-button variant="danger" size="sm" @click="deleteTask(task.id)">Delete</b-button>
                        <b-button variant="success" size="sm" @click="openModal(task)">Update</b-button>
                    </b-button-group>
                </li>
            </ul>
        </b-container>

        <!-- Modal for updating task title -->
        <b-modal v-model="isModalOpen" title="Update Task Title" hide-footer>
            <div>
                <b-form-group label="New Title">
                    <b-form-input v-model="updatedTitle" type="text" class="form-control"></b-form-input>
                </b-form-group>
            </div>
            <b-container class="text-center">
                <b-button variant="success" class="mr-3" @click="updateTaskTitle">Save</b-button>
                <b-button variant="secondary" @click="closeModal">Cancel</b-button>
            </b-container>
        </b-modal>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { useStore } from 'vuex';
import { Task } from '@/models/tasks';

export default class TaskList extends Vue {
    store = useStore();
    searchQuery = '';
    isModalOpen = true;
    selectedTask: Task | null = null;
    updatedTitle = '';

    get tasks() {
        return this.store.getters['TaskModule/tasks'];
    }

    get filteredTasks(): Task[] {
        return this.tasks.filter((task: Task) =>
            task.title !== undefined && task.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
    }

    async computed() {
        return this.tasks.filter((task: Task) => task.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }

    async mounted() {
        this.store.dispatch('TaskModule/fetchTasks');

        this.$watch('taskListKey', () => {
            this.updateTaskList();
        });
    }

    async updateTaskList() {
        await this.store.dispatch('TaskModule/fetchTasks');
    }
    async deleteTask(taskId: number) {
        await this.store.dispatch('TaskModule/removeTask', taskId);
    }

    async updateTask(task: any) {
        await this.store.dispatch('TaskModule/modifyTask', task);
    }

    public openModal(task: Task) {
        this.selectedTask = task;
        this.updatedTitle = task.title; // Set initial value for input field
        this.isModalOpen = true;
    }

    public updateTaskTitle() {
        if (this.selectedTask) {
            // Update the task title
            this.selectedTask.title = this.updatedTitle;
            // Dispatch the action to update the task
            this.store.dispatch('TaskModule/modifyTask', this.selectedTask);
            // Close the modal
            this.closeModal();
        }
    }

    public closeModal() {
        this.isModalOpen = false;
        this.selectedTask = null;
        this.updatedTitle = '';
    }

    

}
</script>
