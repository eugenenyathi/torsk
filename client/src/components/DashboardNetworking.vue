<template>
	<h2>Networking Components</h2>
	<div class="segment-wrapper yellow">
		<router-link to="/networking/routers" class="card">
			<div class="icon-container">
				<Router class="card-icon" />
			</div>
			<p class="statistic">1</p>
			<p class="category">Routers</p>
		</router-link>
		<router-link to="/networking/switches" class="card">
			<div class="icon-container">
				<Switch class="card-icon" />
			</div>
			<p class="statistic">10</p>
			<p class="category">Switches</p>
		</router-link>
		<router-link to="/networking/modems" class="card">
			<div class="icon-container">
				<Modem class="card-icon" />
			</div>
			<p class="statistic">10</p>
			<p class="category">Modems</p>
		</router-link>
		<router-link to="/networking/transmitters" class="card">
			<div class="icon-container">
				<Transmitters class="card-icon" />
			</div>
			<p class="statistic">4</p>
			<p class="category">Transmitters</p>
		</router-link>
	</div>
	<!-- <router-view /> -->
</template>

<script setup>
import Router from "vue-material-design-icons/Router.vue";
import Switch from "vue-material-design-icons/Switch.vue";
import Modem from "vue-material-design-icons/Wifi.vue";
import Transmitters from "vue-material-design-icons/TransitConnection.vue";
</script>
