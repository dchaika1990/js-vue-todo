<template>
	<li class="todos-item" v-bind:class="{edit: editFlag}">
		<input
			v-if="newTask || editFlag"
			type="checkbox"
			v-bind:checked="todo.completed"
			@change="todo.completed = !todo.completed"
			class="mr-10"
		>
		<input
			v-if="newTask || editFlag"
			type="text"
			v-model="todo.title"
		>
		<span
			v-else
			v-bind:class="{completed: todo.completed}"
		>
			{{todo.title}}
		</span>
		<span v-if="newTask || editFlag">
			<button
				@click="$emit('removeTodo', todo.id)"
				class="btn btn-maincolor2 ml-10"
			>Remove</button>
		</span>
	</li>
</template>

<script>
export default {
	name: "TodoItem",
	props: ['todo','editFlag', 'newTask'],
	methods:{

	}
}
</script>

<style scoped>

</style>