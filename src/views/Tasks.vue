<template>
	<div>
		<h2>Tasks List</h2>
		<hr>
		<div class="divider-30"></div>
		<div class="grid-cols-lg-3 grid-cols-md-2 gap-30">
			<div
				@click="newTask"
				class="task task-add"
			>
				+
			</div>
			<TaskItem
				v-if="tasks.length"
				v-for="(task, idx) of tasks"
				:key="task.id"
				v-bind:task="task"
			/>
			<p v-else>No Tasks</p>
		</div>
	</div>
</template>

<script>
import TaskItem from "../components/TaskItem";

export default {
	name: "Tasks",
	computed: {
		tasks() {
			return this.$store.getters.tasks
		}
	},
	components: {
		TaskItem
	},
	methods: {
		newTask(){
			const link = '/task/' + Date.now();
			this.$router.push(link);
		}
	}
}
</script>

<style scoped>

</style>