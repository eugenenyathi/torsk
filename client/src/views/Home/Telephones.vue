<template>
  <section class="single-view-position-container">
    <Layout anchor="telephones" tabular="telephones" device="telephone" />
  </section>
</template>

<script setup>
import Layout from "../../components/Manifesto.vue";

import { useStore } from "vuex";

const store = useStore();
store.commit("setShowDeleteBtn", false);
store.commit("closeActionsMenu", false);
store.commit("setGreyOutAction", false);
</script>
