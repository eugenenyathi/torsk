<template>
	<Layout
		v-if="currentRoute === 'Routers'"
		anchor="routers"
		tabular="routers"
		device="router"
	/>
	<Layout
		v-else-if="currentRoute === 'Switches'"
		anchor="switches"
		tabular="switches"
		device="switch"
	/>
	<Layout
		v-else-if="currentRoute === 'Transceivers'"
		anchor="transceivers"
		tabular="transceivers"
		device="transceiver"
	/>
	<Layout
		v-else-if="currentRoute === 'WiFi'"
		anchor="wifi"
		tabular="wifi"
		device="wifi"
	/>
</template>

<script setup>
import Layout from "./NetworkingManifesto.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const currentRoute = computed(() => useRoute().name);
</script>
