<template>
	<div class="task">
		<h4>{{ task.title }}</h4>
		<TodoList
			v-bind:todos="task.todos.slice(0, 3)"
		/>
		<div class="grid-cols-2 gap-10 mt-20">
			<router-link
				tag="button"
				class="btn btn-maincolor"
				:to="'/task/' + task.id"
			>
				Read more
			</router-link>
			<button
				@click="deleteTask"
				class="btn btn-maincolor2"
			>
				Delete
			</button>
		</div>
	</div>
</template>

<script>
import TodoList from "@/components/TodoList";

export default {
	name: "TaskItem",
	data(){
		return {
			editFlag: false
		}
	},
	props: {
		task: {}
	},
	methods: {
		/**
		 * give task id to parent component
		 */
		deleteTask() {
			this.$emit('deleteTask', this.task.id)
		}
	},
	components: {
		TodoList
	}
}
</script>

<style scoped>

</style>