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
    path: "/asset-state/faulty/networking/routers",
    name: "Routers",
  },
  {
    path: "/asset-state/faulty/networking/switches",
    name: "Switches",
  },
  {
    path: "/asset-state/faulty/networking/converters",
    name: "Converters",
  },
]);
</script>
