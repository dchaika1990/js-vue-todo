<template>
	<div id="app">
		<Navbar/>
		<div class="divider-100"></div>
		<div class="grid-container">
			<router-view/>
		</div>
	</div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
	components: {
		Navbar
	}
}
</script>

<style lang="scss">

</style>
