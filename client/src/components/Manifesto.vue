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

    <EmailsTabular
      v-else-if="currentRoute === 'emails'"
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
import TelephoneTabular from "./Tabular/TelephoneTabular.vue";
import EmailsTabular from "./Tabular/EmailsTabular.vue";
import RDTabular from "./Tabular/RDTabular.vue";
import SoftwareTabular from "./Tabular/SoftwareTabular.vue";
import Pagination from "./Pagination";
import FilterList from "./FilterList";

import usePagination from "@/composables/usePagination.js";
import FilterFn from "@/helpers/FilterFn.js";

import { ref, watch, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const currentRoute = computed(() => useRoute().name.toLowerCase());

console.log("Current route:", currentRoute.value);

const store = useStore();
store.commit("setShowDeleteBtn", false);
store.commit("closeActionsMenu", false);
store.commit("setGreyOutAction", false);

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
