<template>
	<div id="app" class="s-py-100">
		<Navbar/>
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
