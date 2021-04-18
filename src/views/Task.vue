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
			@click="editTask"
			class="btn btn-maincolor mb-20"
		>
			Edit Task
		</button>
		<AddTask
			v-if="newTask || editFlag"
			v-bind:task="task"
			v-bind:newTask="newTask"
			@flagFalse="flagFalse"
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
				><</button>
				<button
					class="btn btn-maincolor ml-20"
					@click="redo"
					:disabled="!(this.historyIndex < (this.taskHistory.length - 1))"
				>></button>
			</div>
			{{historyIndex}}
			<div class="divider-30"></div>
		</div>
		<AddTodo
			v-if="newTask || editFlag"
			@newTodo="newTodo"
		/>
		<div class="divider-40"></div>
		<TodoList
			v-bind:todos="task.todos"
			v-bind:editFlag="editFlag"
			v-bind:newTask="newTask"
			@removeTodo="removeTodo"
		/>
		<div class="divider-40"></div>
		<button
			class="btn btn-maincolor2"
			@click="deleteTask"
		>Delete task</button>
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
			modalHandler: () => {},
			historyTask: {},
			taskHistory: [],
			historyIndex: -1,
			watching: true,
		}
	},
	computed: {
		task: {
			get: function () {
				let task = this.$store.getters.taskById(+this.$route.params.id);
				if ( task === undefined ) {
					task = this.newT
				}
				if (Object.keys(this.historyTask).length){
					task = this.taskHistory[this.historyIndex]
				}
				return task
			},
			set: function (val){
				this.historyTask = val
			}
		},
		newTask(){
			let t = this.$store.getters.taskById(+this.$route.params.id);
			return t === undefined
		}
	},
	watch: {
		task: {
			handler: function(val) {
				if (this.watching) {
					this.taskHistory.push(JSON.parse(JSON.stringify(val)));
					this.historyIndex = this.taskHistory.length - 1;
				} else {
					this.watching = true;
				}
			},
			deep: true,
		}
	},
	methods: {
		editTask() {
			this.editFlag = true;
		},
		deleteTask() {
			this.showModal('Delete task?');
			this.modalHandler = () => {
				this.$store.dispatch('deleteTask', this.task.id);
				this.$router.push('/')
			}
		},
		cancelEditTask(){
			this.showModal('Cancel edit task?');
			this.modalHandler = function () {
				this.$store.dispatch('cancelEditTask');
			}
		},
		flagFalse(flag){
			this.editFlag = flag
		},
		newTodo(item){
			this.task.todos.push(item);
		},
		removeTodo(id){
			this.task.todos = this.task.todos.filter(t => t.id !== id)
		},
		showModal(title){
			this.modalShow = true;
			this.modalTitle = title;
		},
		closeModal(){
			this.modalShow = false;
			this.modalTitle = ''
		},
		undo(){
			this.watching = false;
			console.log('undo')
			if (this.historyIndex > 0) {
				this.historyIndex -= 1;
				this.task = this.taskHistory[this.historyIndex];
			}
		},
		redo(){
			this.watching = false;
			console.log('redo')
			if (this.historyIndex < (this.taskHistory.length - 1)) {
				this.historyIndex += 1;
				this.task = this.taskHistory[this.historyIndex];
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