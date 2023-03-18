<template>
  <AddRemoteDesktop v-if="choice === 'remote'" />
</template>

<script setup>
import AddRemoteDesktop from "./Choices/AddRemoteDesktop";

const props = defineProps({ choice: String });
</script>
