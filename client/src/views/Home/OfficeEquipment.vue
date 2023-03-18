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
    path: "/office-equipment/printers",
    name: "Printers",
  },
  {
    path: "/office-equipment/scanners",
    name: "Scanners",
  },
]);
</script>
