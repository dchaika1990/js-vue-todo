<template>
	<div>
		<form
			v-if="this.task === undefined || this.editFlag"
			@submit.prevent="submitHandler"
		>
			<input
				v-model:title="newTask.title"
				placeholder="Title of Task"
				type="text"
				required>
			<button
				class="btn btn-maincolor mt-20"
				type="submit"
			>Update
			</button>
		</form>
		<div v-else>
			<h2>{{task === undefined ? newTask.title : task.title}}</h2>
			<hr>
			<div class="divider-30"></div>
		</div>
		<button
			v-if="this.task !== undefined && !this.editFlag"
			@click="editTask"
			class="btn btn-maincolor"
		>Edit Task</button>
	</div>
</template>

<script>
export default {
	name: "Task",
	data(){
		return{
			editFlag: false,
			newTask: {
				title: 'New 1',
				id: +this.$route.params.id,
				status: 'active'
			},
		}
	},
	computed: {
		task(){
			return this.$store.getters.taskById(+this.$route.params.id);
		}
	},
	methods: {
		submitHandler(){
			if (this.task !== undefined){
				this.$store.dispatch('updateTask', {
					id: this.newTask.id,
					title: this.newTask.title
				})
			} else {
				this.$store.dispatch('createTask', this.newTask)
				this.$router.push('/')
			}
			this.editFlag = false;
		},
		editTask(){
			this.editFlag = true;
			this.newTask.title = this.task.title;
		}
	}
}
</script>

<style scoped>

</style>