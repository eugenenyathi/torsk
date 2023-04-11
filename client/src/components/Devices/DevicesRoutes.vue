<template>
  <TabularC
    v-if="currentRoute === 'desktops'"
    :showReloadIcon="showReloadIcon"
    @openFilterList="toggleFilterMenu('open', 'user')"
    @reload="reloadData"
  />

  <TabularC
    v-else-if="currentRoute === 'laptops'"
    :showReloadIcon="showReloadIcon"
    @openFilterList="toggleFilterMenu('open', 'user')"
    @reload="reloadData"
  />

  <TabularM
    v-else-if="currentRoute === 'tablets'"
    :showReloadIcon="showReloadIcon"
    @openFilterList="toggleFilterMenu('open', 'user')"
    @reload="reloadData"
  />

  <TabularM
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
import TabularC from "./Tabular-C.vue";
import TabularM from "./Tabular-M.vue";
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
