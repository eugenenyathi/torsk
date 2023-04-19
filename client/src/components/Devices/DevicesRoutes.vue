<template>
  <ServerTable
    v-if="currentRoute === 'servers'"
    :showReloadIcon="showReloadIcon"
    @openFilterList="toggleFilterMenu('open', 'user')"
    @reload="reloadData"
  />

  <ComputerTable
    v-else-if="currentRoute === 'desktops'"
    :showReloadIcon="showReloadIcon"
    @openFilterList="toggleFilterMenu('open', 'user')"
    @reload="reloadData"
  />

  <ComputerTable
    v-else-if="currentRoute === 'laptops'"
    :showReloadIcon="showReloadIcon"
    @openFilterList="toggleFilterMenu('open', 'user')"
    @reload="reloadData"
  />

  <UPSTable
    v-else-if="currentRoute === 'upsuppliers'"
    :showReloadIcon="showReloadIcon"
    @openFilterList="toggleFilterMenu('open', 'user')"
    @reload="reloadData"
  />

  <MobileDeviceTable
    v-else-if="currentRoute === 'tablets'"
    :showReloadIcon="showReloadIcon"
    @openFilterList="toggleFilterMenu('open', 'user')"
    @reload="reloadData"
  />

  <MobileDeviceTable
    v-else-if="currentRoute === 'cellphones'"
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
import ServerTable from "./ServerTable.vue";
import ComputerTable from "./ComputerTable.vue";
import UPSTable from "./UPSTable.vue";
import MobileDeviceTable from "./MobileDeviceTable.vue";
import Pagination from "../Pagination";
import FilterList from "../FilterList";

import usePagination from "@/composables/usePagination.js";
import FilterFn from "@/helpers/FilterFn.js";

import { ref, watch, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const currentRoute = computed(() => useRoute().name.toLowerCase());

const store = useStore();
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
