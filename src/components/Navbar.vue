<template>
	<header class="page_header ls">
		<div class="grid-container grid-cols-3 pt-10 pb-10 align-center">
			<div class="logo">
				<router-link to="/" class="logo">Logo</router-link>
			</div>
			<nav class="nav column-span-2">
				<ul class="nav-menu">
					<li class="nav-item">
						<router-link to="/" exact active-class="active">Home</router-link>
					</li>
					<li class="nav-item">
						<router-link to="/tasks" active-class="active">Tasks</router-link>
					</li>
				</ul>
			</nav>
		</div>
	</header>
</template>

<script>
export default {
	name: "Navbar"
}
</script>

<style scoped>

</style>