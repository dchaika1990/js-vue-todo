<template>
	<div>
		<Modal
			v-if="modalShow"
			v-bind:title="modalTitle"
			v-bind:modalShow="modalShow"
			v-bind:modalHandler="modalHandler"
			@closeModal="closeModal"
		/>
		<button
			v-if="!editFlag && !newTask"
			@click="editTask"
			class="btn btn-maincolor mb-20"
		>
			Edit Task
		</button>
		<AddTask
			v-if="newTask || editFlag"
			v-bind:task="task"
			v-bind:newTask="newTask"
			@flagFalse="flagFalse"
			@cancelEdit="cancelEditTask"
		/>
		<div v-else>
			<h2>{{ task.title }}</h2>
			<hr>
		</div>
		<div class="divider-30"></div>
		<AddTodo
			v-if="newTask || editFlag"
			@newTodo="newTodo"
		/>
		<div class="divider-40"></div>
		<TodoList
			v-bind:todos="task.todos"
			v-bind:editFlag="editFlag"
			v-bind:newTask="newTask"
			@removeTodo="removeTodo"
		/>
	</div>
</template>

<script>
import AddTask from "@/components/AddTask.vue";
import TodoList from "@/components/TodoList";
import AddTodo from "@/components/AddTodo";
import Modal from "@/components/Modal";

export default {
	name: "Task",
	data() {
		return {
			editFlag: false,
			newT: {
				title: 'New Task',
				id: +this.$route.params.id,
				todos: []
			},
			modalTitle: '',
			modalShow: false,
			modalHandler: () => {}
		}
	},
	computed: {
		task() {
			let task = this.$store.getters.taskById(+this.$route.params.id);
			if ( task === undefined ) {
				task = this.newT
			}
			return task
		},
		newTask(){
			let t = this.$store.getters.taskById(+this.$route.params.id);
			return t === undefined
		}
	},
	methods: {
		editTask() {
			this.editFlag = true;
		},
		flagFalse(flag){
			this.editFlag = flag
		},
		newTodo(item){
			this.task.todos.push(item);
		},
		removeTodo(id){
			this.task.todos = this.task.todos.filter(t => t.id !== id)
		},
		cancelEditTask(){
			this.showModal('Cancel edit task?');
			this.modalHandler = function () {
				this.$store.dispatch('cancelEditTask');
			}
		},
		showModal(title){
			this.modalShow = true;
			this.modalTitle = title;
		},
		closeModal(){
			this.modalShow = false;
			this.modalTitle = ''
		},
	},
	components: {
		AddTask, TodoList, AddTodo, Modal
	}
}
</script>

<style scoped>

</style>