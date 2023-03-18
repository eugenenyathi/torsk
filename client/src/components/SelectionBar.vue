<template>
	<div class="selection-bar-wrapper">
		<ul class="selection-bar">
			<li class="list-item" v-for="route in routes" :key="route.name">
				<router-link :to="route.path">
					{{ route.name }}
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script setup>
const props = defineProps({ routes: Array });
</script>
