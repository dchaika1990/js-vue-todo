<template>
	<div>
		<div v-if="task">
			<h2>{{task.title}}</h2>
			<hr>
			<div class="divider-30"></div>
		</div>
		<h2 v-else>Task not fount</h2>
	</div>
</template>

<script>
export default {
	name: "Task",
	computed: {
		task(){
			return this.$store.getters.taskById(+this.$route.params.id)
		}
	}
}
</script>

<style scoped>

</style>