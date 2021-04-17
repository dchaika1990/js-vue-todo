<template>
	<div>
		<Modal
			v-if="modalShow"
			v-bind:title="modalTitle"
			v-bind:modalShow="modalShow"
			v-bind:modalHandler="modalHandler"
			@closeModal="closeModal"
		/>
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
				@deleteTask="deleteTask"
			/>
			<p v-else>No Tasks</p>
		</div>
	</div>
</template>

<script>
import TaskItem from "../components/TaskItem";
import Modal from "../components/Modal";

export default {
	name: "Tasks",
	data() {
		return {
			modalTitle: '',
			modalShow: false,
			modalHandler: () => {}
		}
	},
	computed: {
		tasks() {
			return this.$store.getters.tasks
		}
	},
	components: {
		TaskItem, Modal
	},
	methods: {
		newTask(){
			const link = '/task/' + Date.now();
			this.$router.push(link);
		},
		showModal(title){
			this.modalShow = true;
			this.modalTitle = title;
		},
		closeModal(){
			this.modalShow = false;
			this.modalTitle = ''
		},
		deleteTask(id){
			this.showModal('Cancel delete task?');
			this.modalHandler = function () {
				this.$store.dispatch('deleteTask', id);
			}
		}
	},
}
</script>

<style scoped>

</style>