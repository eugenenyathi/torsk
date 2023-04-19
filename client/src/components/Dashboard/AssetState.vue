<template>
  <section class="nested-views-position-container">
    <SelectionBar :routes="routes" />
    <router-view />
  </section>
</template>

<script setup>
//components
import SelectionBar from "../SelectionBar.vue";
//TODO: Add UPS feature

import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const store = useStore();
const currentRoute = computed(() => useRoute().name.toLowerCase());
const routeType = currentRoute.value.split("-")[0];

store.commit("setShowDeleteBtn", false);
store.commit("closeActionsMenu", false);
store.commit("setGreyOutAction", { specs: false });
store.dispatch("switchHeaderBtn", { showEditBtn: true });

const routes = ref([
  {
    path: `/dashboard/${routeType}/devices`,
    name: "Devices",
  },
  {
    path: `/dashboard/${routeType}/office-equipment`,
    name: "Office Equipment",
  },
  {
    path: `/dashboard/${routeType}/networking`,
    name: "Networking",
  },
  {
    path: `/dashboard/${routeType}/telephones`,
    name: "Telephones",
  },
]);
</script>
