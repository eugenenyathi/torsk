<template>
  <RouterTabular
    v-if="currentRoute === 'routers'"
    :showReloadIcon="showReloadIcon"
    @openFilterList="toggleFilterMenu('open', 'location')"
    @reload="reloadData"
  />

  <SwitchTabular
    v-else-if="currentRoute === 'switches'"
    :showReloadIcon="showReloadIcon"
    @openFilterList="toggleFilterMenu('open', 'location')"
    @reload="reloadData"
  />

  <ConverterTabular v-else-if="currentRoute === 'converters'" />

  <WifiTabular v-else-if="currentRoute === 'wifi'" />

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
import RouterTabular from "./RouterTabular.vue";
import SwitchTabular from "./SwitchTabular.vue";
import ConverterTabular from "./ConverterTabular.vue";
import WifiTabular from "./WifiTabular.vue";
import Pagination from "../Pagination";
import FilterList from "../FilterList";

import usePagination from "@/composables/usePagination.js";
import FilterFn from "@/helpers/FilterFn.js";

import { ref, watch, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const currentRoute = computed(() => useRoute().name.toLowerCase());

const store = useStore();
store.dispatch("setBaseApiRoute", "/torsk/networking/device");

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
