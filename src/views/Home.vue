<template>
	<div>
		<h2>Create Task</h2>
		<hr>
		<div class="divider-30"></div>
		<form @submit.prevent="submitHandler">
			<input
				v-model:title="title"
				placeholder="Title of Task"
				type="text"
				required>
			<button
				class="btn btn-maincolor mt-20"
				type="submit"
			>Create
			</button>
		</form>
	</div>
</template>

<script>

export default {
	name: 'Home',
	data: () => ({
		title: '',
	}),
	methods: {
		submitHandler() {
			const task = {
				title: this.title,
				id: Date.now(),
				status: 'active'
			}
			this.$store.dispatch('createTask', task)
			this.$router.push('/tasks')
		}
	},
	components: {}
}
</script>
