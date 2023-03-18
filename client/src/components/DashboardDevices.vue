<template>
	<h2>Devices</h2>
	<div class="segment-wrapper green">
		<router-link to="/devices/desktops" class="card">
			<div class="icon-container">
				<Devices class="card-icon" />
			</div>
			<p class="statistic">50</p>
			<p class="category">Desktops</p>
		</router-link>
		<router-link to="/devices/laptops" class="card">
			<div class="icon-container">
				<Laptop class="card-icon" />
			</div>
			<p class="statistic">10</p>
			<p class="category">Laptops</p>
		</router-link>
		<router-link to="/devices/tablets" class="card">
			<div class="icon-container">
				<Tablet class="card-icon" />
			</div>
			<p class="statistic">20</p>
			<p class="category">Tablets</p>
		</router-link>
		<router-link to="/devices/cellphones" class="card">
			<div class="icon-container">
				<Cellphone class="card-icon" />
			</div>
			<p class="statistic">10</p>
			<p class="category">Cellphones</p>
		</router-link>
	</div>
	<!-- <router-view /> -->
</template>

<script setup>
//icons
import Devices from "vue-material-design-icons/Monitor.vue";
import Laptop from "vue-material-design-icons/Laptop.vue";
import Tablet from "vue-material-design-icons/Tablet.vue";
import Cellphone from "vue-material-design-icons/Cellphone.vue";
</script>
