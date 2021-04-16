<template>
	<div class="task">
		<h4>{{ task.title }}</h4>
		<div class="grid-cols-2 gap-10">
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
			>Delete</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "TaskItem",
	props: {
		task: {}
	},
	methods: {
		deleteTask(){
			this.$store.dispatch('deleteTask', this.task.id);
		}
	}
}
</script>

<style scoped>

</style>