<template>
	<div>
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
			@cancelEdit="flagFalse"
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
		<TodoList
			v-bind:todos="task.todos"
			v-bind:editFlag="editFlag"
			v-bind:newTask="newTask"
			@removeTodo="removeTodo"
		/>
	</div>
</template>

<script>
import AddTask from "../components/AddTask.vue";
import TodoList from "../components/TodoList";
import AddTodo from "../components/AddTodo";

export default {
	name: "Task",
	data() {
		return {
			editFlag: false,
			newT: {
				title: 'New Task',
				id: +this.$route.params.id,
				todos: []
			}
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
		}
	},
	components: {
		AddTask, TodoList, AddTodo
	}
}
</script>

<style scoped>

</style>