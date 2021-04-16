<template>
	<div class="task">
		<h4>{{ task.title }}</h4>
		<router-link
			tag="button"
			class="btn btn-maincolor"
			:to="'/task/' + task.id"
		>
			Read more
		</router-link>
	</div>
</template>

<script>
export default {
	name: "TaskItem",
	props: {
		task: {}
	}
}
</script>

<style scoped>

</style>