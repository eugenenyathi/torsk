<template>
  <RouterTable
    v-if="currentRoute === 'routers'"
    :showReloadIcon="showReloadIcon"
    @openFilterList="toggleFilterMenu('open', 'location')"
    @reload="reloadData"
  />

  <SwitchTable
    v-else-if="currentRoute === 'switches'"
    :showReloadIcon="showReloadIcon"
    @openFilterList="toggleFilterMenu('open', 'location')"
    @reload="reloadData"
  />

  <ConverterTable v-else-if="currentRoute === 'converters'" />

  <WifiTable v-else-if="currentRoute === 'wifi'" />

  <NetworkingConfig v-else />

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
import RouterTable from "./RouterTable.vue";
import SwitchTable from "./SwitchTable.vue";
import ConverterTable from "./ConverterTable.vue";
import WifiTable from "./WifiTable.vue";
import NetworkingConfig from "./NetworkingConfig.vue";
import Pagination from "../Pagination";
import FilterList from "../FilterList";

import usePagination from "@/composables/usePagination.js";
import FilterFn from "@/helpers/FilterFn.js";

import { ref, watch, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const currentRoute = computed(() => useRoute().name.toLowerCase());

const store = useStore();
store.dispatch("switchHeaderBtn", { showEditBtn: true });
store.dispatch("setBaseApiRoute", "/torsk/networking/device");
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
