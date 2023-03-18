<template>
  <Specs v-if="action === 'specs'" />
  <Update v-else-if="action === 'update'" />
  <State v-else :action="action" :context="context" />
</template>

<script setup>
import Specs from "./Fragments/ComputerSpecs.vue";
import Update from "./Fragments/ComputerUpdate.vue";
import State from "./ActionState.vue";

const props = defineProps({
  action: String,
  context: String,
});
</script>
