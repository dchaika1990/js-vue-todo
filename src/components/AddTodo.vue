<template>
	<form @submit.prevent="addTodo" class="d-flex">
		<input
			v-model="title"
			type="text"
			placeholder="New todo"
		>
		<button class="btn btn-maincolor">Add Todo</button>
	</form>
</template>

<script>
export default {
	name: "AddTodo",
	data(){
		return {
			title: ''
		}
	},
	methods: {
		/**
		 * create new todoItem and give it to parent component and clean the form
		 */
		addTodo(){
			if (this.title.trim()){
				let todoItem = {
					id: Date.now(),
					title: this.title,
					completed: false
				}
				this.$emit('newTodo', todoItem);
				this.title = '';
			}
		}
	}
}
</script>

<style scoped>

</style>