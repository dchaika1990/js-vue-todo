<template>
	<form @submit.prevent="onSubmit">
		<button
			class="btn btn-maincolor mb-20"
			type="submit"
		>Save Task
		</button>
		<input
			v-model:title="newTask.title"
			placeholder="Title of Task"
			type="text"
			required>
	</form>
</template>

<script>
export default {
	name: "AddTask",
	props: ['newTask', 'task'],
	methods: {
		onSubmit() {
			if (this.task !== undefined) {
				this.$store.dispatch('updateTask', {
					id: this.newTask.id,
					title: this.newTask.title
				})
			} else {
				this.$store.dispatch('createTask', this.newTask)
				this.$router.push('/')
			}
			this.editFlag = false;
			this.$emit('flagFalse', this.editFlag)
		},
	}
}
</script>

<style scoped>

</style>