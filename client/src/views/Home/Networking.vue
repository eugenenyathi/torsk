<template>
  <section class="nested-views-position-container special">
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
    path: "/networking/routers",
    name: "Routers",
  },
  {
    path: "/networking/switches",
    name: "Switches",
  },
  {
    path: "/networking/converters",
    name: "Converters",
  },
  {
    path: "/networking/wifi",
    name: "WiFi",
  },
  {
    path: "/networking/config",
    name: "Config",
  },
]);
</script>
