<template>
	<header class="page_header ls grid-container grid-cols-3 pt-10 pb-10 align-center">
		<div class="logo">
			<a href="/" rel="home" class="logo">Logo</a>
		</div>
		<nav class="nav column-span-2">
			<ul class="nav-menu">
				<li class="nav-item">
					<router-link to="/">Home</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/task">Tasklist</router-link>
				</li>
			</ul>
		</nav>
	</header>
</template>

<script>
export default {
	name: "Navigation"
}
</script>

<style scoped>

</style>