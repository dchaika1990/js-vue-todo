<template>
	<form @submit.prevent="addTodo" class="grid-cols-6">
		<input
			v-model="title"
			class="column-span-5"
			type="text"
			placeholder="New todo"
		>
		<button class="btn btn-maincolor2">Add Todo</button>
		<div class="divider-40"></div>
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