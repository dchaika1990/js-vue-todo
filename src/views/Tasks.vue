<template>
	<div>
		<h2>Tasks List</h2>
		<hr>
		<div class="divider-30"></div>
		<div v-if="tasks.length" class="grid-cols-lg-4 grid-cols-md-2 gap-30">
			<div
				v-for="(task, idx) of tasks"
				:key="task.id"
				class="task"
			>
				<h4>{{task.title}}</h4>
				<router-link
					tag="button"
					class="btn btn-maincolor"
					:to="'/task/' + task.id"
				>
					Read more
				</router-link>
			</div>
		</div>
		<p v-else>No Tasks</p>
	</div>
</template>

<script>
export default {
	name: "Tasks",
	computed: {
		tasks(){
			return this.$store.getters.tasks
		}
	}
}
</script>

<style scoped>

</style>