<template>
  <PrinterTable
    v-if="currentRoute === 'printers'"
    :showReloadIcon="showReloadIcon"
    @openFilterList="toggleFilterMenu('open', 'user')"
    @reload="reloadData"
  />

  <ScannerTable
    v-else-if="currentRoute === 'scanners'"
    :showReloadIcon="showReloadIcon"
    @openFilterList="toggleFilterMenu('open', 'user')"
    @reload="reloadData"
  />

  <Pagination />

  <teleport to="#port-modal">
    <Transition name="popup" appear>
      <FilterList
        :searchContext="searchContext"
        v-model="filterInput"
        v-if="filterMenuOpen"
        @search="searchData"
        @close="toggleFilterMenu('close')"
      />
    </Transition>
  </teleport>
</template>

<script setup>
import PrinterTable from "./PrinterTable.vue";
import ScannerTable from "./ScannerTable.vue";
import Pagination from "../Pagination";
import FilterList from "../FilterList";

import usePagination from "@/composables/usePagination.js";
import FilterFn from "@/helpers/FilterFn.js";

import { ref, watch, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const currentRoute = computed(() => useRoute().name.toLowerCase());

const store = useStore();
store.dispatch("setBaseApiRoute", "/torsk/office_equipment/device");
store.dispatch("closeActionsMenu", false);

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
