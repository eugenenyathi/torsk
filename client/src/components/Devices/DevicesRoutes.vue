<template>
  <Layout
    v-if="currentRoute === 'Desktops'"
    anchor="desktops"
    tabular="computer"
    device="desktop"
  />
  <Layout
    v-else-if="currentRoute === 'Laptops'"
    anchor="laptops"
    tabular="computer"
    device="laptop"
  />
  <Layout
    v-else-if="currentRoute === 'Tablets'"
    anchor="tablets"
    tabular="mobile"
    device="tablet"
  />
  <Layout
    v-else-if="currentRoute === 'Cellphones'"
    anchor="phones"
    tabular="mobile"
    device="phone"
  />
</template>

<script setup>
import Layout from "./DevicesManifesto.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const currentRoute = computed(() => useRoute().name);
</script>
