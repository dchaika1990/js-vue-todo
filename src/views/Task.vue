<template>
	<div>
		<Modal
			v-if="modalShow"
			v-bind:title="modalTitle"
			v-bind:modalShow="modalShow"
			v-bind:modalHandler="modalHandler"
			@closeModal="closeModal"
		/>
		<button
			v-if="!editFlag && !newTask"
			@click="changeFlag(true)"
			class="btn btn-maincolor mb-20"
		>
			Edit Task
		</button>
		<AddTask
			v-if="newTask || editFlag"
			v-bind:task="task"
			v-bind:newTask="newTask"
			@flagFalse="changeFlag"
			@cancelEdit="cancelEditTask"
		/>
		<div v-else>
			<h2>{{ task.title }}</h2>
			<hr>
		</div>
		<div class="divider-30"></div>
		<div v-if="newTask || editFlag">
			<div class="d-flex">
				<button
					class="btn btn-maincolor"
					@click="undo"
					:disabled="!(this.historyIndex > 0)"
				><
				</button>
				<button
					class="btn btn-maincolor ml-20"
					@click="redo"
					:disabled="!(this.historyIndex < (this.historyTasks.length - 1))"
				>>
				</button>
			</div>
			<div class="divider-30"></div>
		</div>
		<TodoList
			v-bind:todos="task.todos"
			v-bind:editFlag="editFlag"
			v-bind:newTask="newTask"
			@removeTodo="removeTodo"
		/>
		<div class="divider-40"></div>
		<AddTodo
			v-if="newTask || editFlag"
			@newTodo="newTodo"
		/>
		<div class="divider-40"></div>
		<button
			class="btn btn-maincolor2"
			@click="deleteTask"
		>Delete task
		</button>
	</div>
</template>

<script>
import AddTask from "@/components/AddTask.vue";
import TodoList from "@/components/TodoList";
import AddTodo from "@/components/AddTodo";
import Modal from "@/components/Modal";

export default {
	name: "Task",
	data() {
		return {
			editFlag: false,
			newT: {
				title: 'New Task',
				id: +this.$route.params.id,
				todos: []
			},
			modalTitle: '',
			modalShow: false,
			modalHandler: () => {
			},
			historyTasks: [],
			historyIndex: 0,
			watching: true,
		}
	},
	computed: {
		/**
		 * get task from store
		 */
		task(){
			let task = this.$store.getters.taskById(+this.$route.params.id);
			if (task === undefined) {
				task = this.newT
			}
			return task
		},
		/**
		 * checking if the page is new
		 */
		newTask() {
			let t = this.$store.getters.taskById(+this.$route.params.id);
			return t === undefined
		}
	},
	watch: {
		/**
		 * watching for changes with task
		 */
		task: {
			handler: function (val) {
				if (this.watching) {
					this.historyTasks.push(JSON.parse(JSON.stringify(val)));
					this.historyIndex = this.historyTasks.length - 1;
				} else {
					this.watching = true;
				}
			},
			deep: true,
		}
	},
	methods: {
		/**
		 * show modal and give it the function for deleting
		 */
		deleteTask() {
			this.showModal('Delete task?');
			this.modalHandler = () => {
				this.$store.dispatch('deleteTask', this.task.id);
				this.$router.push('/')
			}
		},
		/**
		 * show modal and give it the function for cancel editing
		 */
		cancelEditTask() {
			this.showModal('Cancel edit task?');
			this.modalHandler = () => {
				this.$store.dispatch('cancelEditTask');
			}
		},
		/**
		 * changing flag for edit
		 */
		changeFlag(flag) {
			this.editFlag = flag
		},
		/**
		 * create new todoItem
		 */
		newTodo(item) {
			this.task.todos.push(item);
		},
		/**
		 * delete todoItem by id
		 */
		removeTodo(id) {
			this.task.todos = this.task.todos.filter(t => t.id !== id)
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
		 * rewrite task title and task todos
		 */
		rewriteTask() {
			this.task.title = this.historyTasks[this.historyIndex].title;
			this.task.todos = this.historyTasks[this.historyIndex].todos;
		},
		/**
		 * button for return action
		 */
		undo() {
			this.watching = false;
			if (this.historyIndex > 0) {
				this.historyIndex -= 1;
				this.rewriteTask();
			}
		},
		/**
		 * button for repeat action
		 */
		redo() {
			this.watching = false;
			if (this.historyIndex < (this.historyTasks.length - 1)) {
				this.historyIndex += 1;
				this.rewriteTask();
			}
		},
	},
	components: {
		AddTask, TodoList, AddTodo, Modal
	}
}
</script>

<style scoped>

</style>