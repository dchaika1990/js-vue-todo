<template>
	<form @submit.prevent="onSubmit">
		<div>
			<button
				class="btn btn-maincolor mb-20 mr-20"
				type="submit"
			>Save Task
			</button>
			<button
				v-if="!newTask"
				class="btn btn-maincolor2 mb-20"
				type="button"
				@click="cancelEdit"
			>Cancel Edit Task
			</button>
		</div>
		<input
			v-model:title="task.title"
			placeholder="Title of Task"
			class="task-form"
			type="text"
			required>
	</form>
</template>

<script>
export default {
	name: "AddTask",
	props: ['task', 'newTask'],
	data(){
		return {
			editFlag: false
		}
	},
	methods: {
		onSubmit() {
			if (!this.newTask) {
				this.$store.dispatch('updateTask', {
					id: this.task.id,
					title: this.task.title,
					todos: this.task.todos
				})
			} else {
				this.$store.dispatch('createTask', this.task)
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