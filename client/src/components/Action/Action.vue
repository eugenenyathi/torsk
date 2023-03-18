<template>
  <ComputerSpecs v-if="action === 'specs'" />
  <UpdateComputer v-else-if="action === 'update'" />
</template>

<script setup>
// import ComputerSpecs from "./ComputerSpecs";
// import UpdateComputer from "./UpdateComputer";

const props = defineProps({
  action: String,
});

// console.log(props.action);
</script>
