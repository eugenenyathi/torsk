<template>
  <section class="position-container">
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
    path: "/devices/desktops",
    name: "Desktops",
  },
  {
    path: "/devices/laptops",
    name: "Laptops",
  },
  {
    path: "/devices/tablets",
    name: "Tablets",
  },
  {
    path: "/devices/cellphones",
    name: "Cellphones",
  },
]);
</script>
