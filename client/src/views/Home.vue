<template>
	<Sidebar />
	<Header />
	<router-view />
	<Actions />
</template>

<script setup>
import Sidebar from "../components/Sidebar.vue";
import Header from "../components/Header.vue";
import Actions from "../components/Actions.vue";
</script>
