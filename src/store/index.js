import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		tasks: JSON.parse(localStorage.getItem('tasks') || '[]')
	},
	mutations: {
		createTask(state, task){
			state.tasks.push(task);
			localStorage.setItem('tasks', JSON.stringify(state.tasks))
		},
		updateTask(state, {id, title, todos}){
			const tasks = [...state.tasks];
			const idx = tasks.findIndex(task => task.id === id);
			const task = tasks[idx];
			tasks[idx] = {...task, id, title, todos};
			state.tasks = tasks;
			localStorage.setItem('tasks', JSON.stringify(state.tasks))
		},
		deleteTask(state, id){
			state.tasks = state.tasks.filter(t => t.id !== id);
			localStorage.setItem('tasks', JSON.stringify(state.tasks))
		}
	},
	actions: {
		createTask({commit}, task) {
  			commit('createTask', task)
		},
		updateTask({commit}, task){
			commit('updateTask', task)
		},
		deleteTask({commit}, id) {
			commit('deleteTask', id)
		}
	},
	getters: {
		tasks: state => state.tasks,
		taskById: state => id => state.tasks.find(task => task.id === id)
	},
	modules: {}
})
