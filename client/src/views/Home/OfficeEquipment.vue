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

store.dispatch("switchHeaderBtn", {
  showAddBtn: true,
  showEditBtn: false,
  showDeleteBtn: false,
});
store.dispatch("closeActionsMenu", false);
store.dispatch("setGreyOutAction", false);

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
