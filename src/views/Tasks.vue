<template>
	<div>
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
				v-for="task of tasks"
				:key="task.id"
				v-bind:task="task"
				@deleteTask="deleteT"
			/>
			<p v-else>No Tasks</p>
		</div>
		<div class="divider-30">
			<hr>
			<p>Made by Dmitriy Chaika. <a href="https://github.com/dchaika1990/js-vue-todo/" target="_blank">My git</a>
			</p>
		</div>
		<Modal
			v-if="modalShow"
			v-bind:title="modalTitle"
			v-bind:modalShow="modalShow"
			v-bind:modalHandler="modalHandler"
			@closeModal="closeModal"
		/>
	</div>
</template>

<script>
import TaskItem from "@/components/TaskItem";
import Modal from "@/components/Modal";

export default {
	name: "Tasks",
	data() {
		return {
			modalTitle: '',
			modalShow: false,
			modalHandler: () => {
			}
		}
	},
	computed: {
		/**
		 * get task from store
		 */
		tasks() {
			return this.$store.getters.tasks
		}
	},
	components: {
		TaskItem, Modal
	},
	methods: {
		/**
		 * create link to new task
		 * and link there
		 */
		newTask() {
			const link = '/task/' + Date.now();
			this.$router.push(link);
		},
		/**
		 * show modal with title
		 */
		showModal(title) {
			this.modalShow = true;
			this.modalTitle = title;
		},
		/**
		 * close modal and clean title
		 */
		closeModal() {
			this.modalShow = false;
			this.modalTitle = ''
		},
		/**
		 * giving title and handler confirm to modal
		 */
		deleteT(id) {
			this.showModal('Delete task?');
			this.modalHandler = function () {
				this.$store.dispatch('deleteTask', id);
			}
		},
	},
}
</script>

<style scoped>

</style>