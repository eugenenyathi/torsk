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
  showAddBtn: false,
  showEditBtn: false,
  showDeleteBtn: false,
});
store.dispatch("closeActionsMenu", false);
store.dispatch("setGreyOutAction", { specs: true, update: true });

const routes = ref([
  {
    path: "/asset-state/decommissioned/devices/servers",
    name: "Servers",
  },
  {
    path: "/asset-state/decommissioned/devices/desktops",
    name: "Desktops",
  },
  {
    path: "/asset-state/decommissioned/devices/laptops",
    name: "Laptops",
  },
  {
    path: "/asset-state/decommissioned/devices/ups",
    name: "UPS",
  },
  {
    path: "/asset-state/decommissioned/devices/tablets",
    name: "Tablets",
  },
  {
    path: "/asset-state/decommissioned/devices/cellphones",
    name: "Cellphones",
  },
]);
</script>
