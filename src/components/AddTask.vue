<template>
	<form @submit.prevent="onSubmit">
		<div>
			<button
				class="btn btn-maincolor mb-20 mr-20"
				type="submit"
			>Save Task
			</button>
			<button
				class="btn btn-maincolor2 mb-20"
				type="button"
				@click="cancelEdit"
			>Cancel Edit Task
			</button>
		</div>

		<input
			v-model:title="newTask.title"
			placeholder="Title of Task"
			class="task-form"
			type="text"
			required>
	</form>
</template>

<script>
export default {
	name: "AddTask",
	props: ['newTask', 'task'],
	data(){
		return {
			editFlag: false
		}
	},
	methods: {
		onSubmit() {
			if (this.task !== undefined) {
				this.$store.dispatch('updateTask', {
					id: this.newTask.id,
					title: this.newTask.title,
					todos: this.task.todos
				})
			} else {
				this.$store.dispatch('createTask', this.newTask)
				this.$router.push('/')
			}
			this.$emit('flagFalse', this.editFlag)
		},
		cancelEdit(){
			this.$store.dispatch('cancelEditTask')
			this.$emit('flagFalse', this.editFlag)
		}
	},
}
</script>

<style scoped>

</style>