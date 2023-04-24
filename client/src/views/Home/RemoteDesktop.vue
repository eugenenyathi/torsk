<template>
  <section class="single-view-position-container">
    <Layout anchor="remotedesktop" tabular="remotedesktop" device="machine" />
  </section>
</template>

<script setup>
import Layout from "../../components/Manifesto.vue";
import { useStore } from "vuex";

const store = useStore();

store.dispatch("switchHeaderBtn", {
  showAddBtn: true,
  showEditBtn: false,
  showDeleteBtn: false,
});
store.dispatch("closeActionsMenu", false);
store.dispatch("setGreyOutAction", {
  specs: true,
  update: true,
  decommission: true,
});
</script>
