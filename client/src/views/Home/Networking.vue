<template>
  <section class="devices-container home-container">
    <SelectionBar :routes="routes" />
    <router-view />
  </section>
</template>

<script setup>
//components
import SelectionBar from "../../components/SelectionBar.vue";

import { ref } from "vue";

const routes = ref([
  {
    path: "/networking/routers",
    name: "Routers",
  },
  {
    path: "/networking/switches",
    name: "Switches",
  },
  {
    path: "/networking/transceivers",
    name: "Transceivers",
  },
  {
    path: "/networking/wifi",
    name: "WiFi",
  },
]);
</script>
