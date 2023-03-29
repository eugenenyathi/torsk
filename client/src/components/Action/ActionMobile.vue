<template>
  <Specs v-if="action === 'specs'" />
  <Update v-else-if="action === 'update'" />
  <State v-else :action="action" :context="context" />
</template>

<script setup>
import Specs from "./Fragments/MobileSpecs";
import Update from "./Fragments/MobileUpdate";
import State from "./ActionState";

import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  action: String,
  context: String,
});

const store = useStore();
const data = computed(() => store.getters.getTransitData);
</script>
