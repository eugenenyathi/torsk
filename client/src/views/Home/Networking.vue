<template>
  <section class="nested-views-position-container special">
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
]);
</script>
