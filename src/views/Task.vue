<template>
	<div>
		<button
			v-if="this.task !== undefined && !this.editFlag"
			@click="editTask"
			class="btn btn-maincolor mb-20"
		>Edit Task
		</button>
		<AddTask
			v-if="this.task === undefined || this.editFlag"
			v-bind:newTask="newTask"
			v-bind:task="task"
			@flagFalse="flagFalse"
		/>
		<div v-else>
			<h2>{{ task === undefined ? newTask.title : task.title }}</h2>
			<hr>
		</div>
		<div class="divider-30"></div>
		<AddTodo
			v-if="editFlag"
			@newTodo="newTodo"
		/>
		<TodoList
			v-bind:todos="task.todos"
			v-bind:editFlag="editFlag"
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
			newTask: {
				title: 'New Task',
				id: +this.$route.params.id,
				todos: []
			},
		}
	},
	computed: {
		task() {
			return this.$store.getters.taskById(+this.$route.params.id);
		}
	},
	methods: {
		editTask() {
			this.editFlag = true;
			this.newTask.title = this.task.title;
		},
		flagFalse(flag){
			this.editFlag = flag
		},
		newTodo(item){
			this.task.todos.push(item);
		}
	},
	components: {
		AddTask, TodoList, AddTodo
	}
}
</script>

<style scoped>

</style>