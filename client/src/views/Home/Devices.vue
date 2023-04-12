<template>
  <section class="nested-views-position-container">
    <SelectionBar :routes="routes" />
    <router-view />
  </section>
</template>

<script setup>
//components
import SelectionBar from "../../components/SelectionBar.vue";

import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

store.commit("setShowDeleteBtn", false);
store.commit("closeActionsMenu", false);
store.commit("setGreyOutAction", false);

const routes = ref([
  {
    path: "/devices/servers",
    name: "Servers",
  },
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
