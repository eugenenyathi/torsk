<template>
  <Layout
    v-if="currentRoute === 'Printers'"
    anchor="printers"
    tabular="printers"
    device="printer"
  />
  <Layout
    v-else-if="currentRoute === 'Scanners'"
    anchor="scanners"
    tabular="scanners"
    device="scanner"
  />
</template>

<script setup>
import Layout from "./OfficeEquipManifesto.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const currentRoute = computed(() => useRoute().name);
</script>
