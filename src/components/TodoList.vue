<template>
	<ul class="todos">
		<TodoItem
			v-for="todo in todos"
			v-bind:todo="todo"
			v-bind:editFlag="editFlag"
			v-bind:newTask="newTask"
			@removeTodo="removeTodo"
			:key="todo.id"
		/>
	</ul>
</template>

<script>
import TodoItem from "./TodoItem";

export default {
	name: "TodoList",
	props: ['todos', 'editFlag', 'newTask'],
	components: {
		TodoItem
	},
	methods: {
		removeTodo(id) {
			this.$emit('removeTodo', id)
		}
	}
}
</script>

<style scoped>

</style>