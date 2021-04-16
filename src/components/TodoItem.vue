<template>
	<li class="todos-item" v-bind:class="{edit: editFlag}">
		<input
			v-if="editFlag"
			type="checkbox"
			@change="todo.completed = !todo.completed"
		>
		{{todo.title}}
	</li>
</template>

<script>
export default {
	name: "TodoItem",
	props: ['todo','editFlag'],
	methods:{

	}
}
</script>

<style scoped>

</style>