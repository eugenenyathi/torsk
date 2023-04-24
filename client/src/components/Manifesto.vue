<template>
  <section class="single-view-position-container">
    <TelephoneTabular
      v-if="currentRoute === 'telephones'"
      :showReloadIcon="showReloadIcon"
      @openFilterList="toggleFilterMenu('open', 'user')"
      @reload="reloadData"
    />

    <RDTabular
      v-else-if="currentRoute === 'remote desktop'"
      :showReloadIcon="showReloadIcon"
      @openFilterList="toggleFilterMenu('open', 'user')"
      @reload="reloadData"
    />

    <SoftwareTabular v-else-if="currentRoute === 'desktops'" />

    <Pagination />

    <teleport to="#port-modal">
      <FilterList
        :searchContext="searchContext"
        v-model="filterInput"
        v-if="filterMenuOpen"
        @search="searchData"
        @close="toggleFilterMenu('close')"
      />
    </teleport>
  </section>
</template>

<script setup>
import TelephoneTabular from "./Tabular/TelephoneTable.vue";
import RDTabular from "./Tabular/RDTable.vue";
import SoftwareTabular from "./Tabular/SoftwareTable.vue";
import Pagination from "./Pagination";
import FilterList from "./FilterList";

import usePagination from "@/composables/usePagination.js";
import FilterFn from "@/helpers/FilterFn.js";

import { ref, watch, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const currentRoute = computed(() => useRoute().name.toLowerCase());

// console.log("Current route:", currentRoute.value);

const store = useStore();
store.dispatch("switchHeaderBtn", {
  showAddBtn: true,
  showEditBtn: false,
  showDeleteBtn: false,
});
store.commit("closeActionsMenu", false);
store.commit("setGreyOutAction", { specs: false });

const { pagination, rowsPerPage } = usePagination();

const filterInput = ref("");

const {
  searchContext,
  filterMenuOpen,
  showReloadIcon,
  reloadData,
  toggleFilterMenu,
  searchData,
} = FilterFn(filterInput);

watch(rowsPerPage, () => {
  pagination();
});
</script>
