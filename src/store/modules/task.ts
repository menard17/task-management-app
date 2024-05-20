// src/store/modules/TaskModule.ts
import { Task } from '@/models/tasks';
import axios from '@/axiosConfig';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';

@Module({ namespaced: true })
class TaskModule extends VuexModule {
    public _tasks: Task[] = [];

    @Mutation
    setTasks(tasks: Task[]): void {
        this._tasks = tasks;
    }

    @Mutation
    addTask(task: Task): void {
        this._tasks.push(task);
    }

    @Mutation
    deleteTask(taskId: number): void {
        this._tasks = this._tasks.filter((task) => task.id !== taskId);
    }

    @Mutation
    updateTask(updatedTask: Task): void {
        const index = this._tasks.findIndex((task) => task.id === updatedTask.id);
        if (index !== -1) {
            this._tasks[index] = updatedTask;
        }
    }

    get tasks() {
        return this._tasks;
    }

    @Action
    public async fetchTasks(): Promise<void> {
        try {
            const response = await axios.get('/tasks');
            this.context.commit('setTasks', response.data);
        } catch (error) {
            console.error('Error fetch task:', error);
        }
        
    }

    @Action
    async createTask(task: Task): Promise<void> {
        try {
            const response = await axios.post('/tasks', task);
            this.context.commit('addTask', response.data);
        } catch (error) {
            console.error('Error creating task:', error);
        }
    }

    @Action
    public async removeTask(taskId: number): Promise<void> {
        try {
            await axios.delete(`/tasks/${taskId}`);
            this.context.commit('deleteTask', taskId);
        } catch (error) {
            console.error('Error removeTask task:', error);
        }
       
    }

    @Action
    public async modifyTask(task: Task): Promise<void> {
        debugger;
        console.log("test")
        const response = await axios.put(`/tasks/${task.id}`, task);
        this.context.commit('updateTask', response.data);
    }
}

export default TaskModule;
