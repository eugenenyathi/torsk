<template>
  <section class="nested-views-position-container">
    <SelectionBar :routes="routes" />
    <router-view />
  </section>
</template>

<script setup>
//components
import SelectionBar from "@/components/SelectionBar.vue";

import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

store.dispatch("switchHeaderBtn", {
  showAddBtn: true,
  showEditBtn: false,
  showDeleteBtn: false,
});
store.dispatch("closeActionsMenu", false);
store.dispatch("setGreyOutAction", { specs: true, update: true });

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
    path: "/devices/ups",
    name: "UPS",
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
