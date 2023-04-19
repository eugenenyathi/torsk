<template>
  <section class="nested-views-position-container">
    <SelectionBar :routes="routes" />
    <router-view />
  </section>
</template>

<script setup>
//TODO: fix add new email button

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
store.dispatch("setGreyOutAction", false);

const routes = ref([
  {
    path: "/emails/list",
    name: "Emails",
  },
  {
    path: "/emails/config",
    name: "Config",
  },
]);
</script>
