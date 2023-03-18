<template>
	<h2>General</h2>
	<div class="segment-wrapper red">
		<router-link to="/replacement" class="card">
			<div class="icon-container">
				<Devices class="card-icon" />
			</div>
			<p class="statistic">0</p>
			<p class="category">Faulty</p>
		</router-link>
		<router-link to="/" class="card">
			<div class="icon-container">
				<Devices class="card-icon" />
			</div>
			<p class="statistic">10</p>
			<p class="category">Decommissioned Equip</p>
		</router-link>
		<router-link to="/" class="card">
			<div class="icon-container">
				<Devices class="card-icon" />
			</div>
			<p class="statistic">0</p>
			<p class="category">In Repair</p>
		</router-link>
		<router-link to="/" class="card">
			<div class="icon-container">
				<Devices class="card-icon" />
			</div>
			<p class="statistic">0</p>
			<p class="category">Dead Equipment</p>
		</router-link>
	</div>
	<!-- <router-view /> -->
</template>

<script setup>
import Devices from "vue-material-design-icons/Devices.vue";
</script>
