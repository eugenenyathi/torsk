<template>
  <PrinterTabular
    v-if="tabular === 'printers'"
    :machines="currentDeviceData"
    :showReloadIcon="showReloadIcon"
    @open="openActionsMenu"
    @openFilterList="toggleFilterMenu('open')"
    @reload="reloadData"
  />

  <ScannerTabular
    v-else-if="tabular === 'scanners'"
    :machines="currentDeviceData"
    :showReloadIcon="showReloadIcon"
    @open="openActionsMenu"
    @openFilterList="toggleFilterMenu('open')"
    @reload="reloadData"
  />

  <Pagination :pageNumbers="pageNumbers" @currentPage="currentPage" />

  <teleport to="#port-modal">
    <FilterList
      :device="device"
      v-model="filterInput"
      v-if="filterMenuOpen"
      @search="searchData"
      @close="toggleFilterMenu('close')"
    />
  </teleport>
</template>

<script setup>
import PrinterTabular from "./PrinterTabular.vue";
import ScannerTabular from "./ScannerTabular.vue";
import Pagination from "../Pagination";
import FilterList from "../FilterList";

import useAxiosError from "../../composables/useAxiosError.js";
import usePagination from "../../composables/usePagination.js";

import ActiveChildRoute from "../../helpers/ActiveChildRoute.js";
import FilterFn from "../../helpers/FilterFn.js";

import axios from "axios";
import { useStore } from "vuex";
import { ref, watch, computed } from "vue";

import { useRoute } from "vue-router";
const currentRoute = computed(() => useRoute().name);

const props = defineProps(["anchor", "tabular", "device"]);
const store = useStore();

const { subIsActive } = ActiveChildRoute();

const deviceData = ref([]);
const currentDeviceData = ref([]);
const axiosError = ref(null);

const filterInput = ref("");

const { paginate, pagination, rowsPerPage, showCurrentPageData } =
  usePagination();

const {
  filterMenuOpen,
  showReloadIcon,
  reloadData,
  pageNumbers,
  toggleFilterMenu,
  searchData,
} = FilterFn([filterInput, deviceData, currentDeviceData]);

const fetchDeviceData = async () => {
  try {
    if (props.anchor === "printers") {
      const res = await axios("/printers");
      deviceData.value = res.data;
    } else if (props.anchor === "scanners") {
      const res = await axios("/scanners");
      deviceData.value = res.data;
    }

    currentDeviceData.value = pagination(deviceData.value);
    pageNumbers.value = paginate(deviceData.value.length);
  } catch (err) {
    console.log(err);
    // useAxiosError(err, axiosError);
  }
};

fetchDeviceData();

//pagination stuff
const currentPage = (page) => {
  showCurrentPageData(page, deviceData, currentDeviceData);
};

watch(rowsPerPage, () => {
  currentDeviceData.value = pagination(deviceData.value);
});

//actions sidemenu
const openActionsMenu = () => {
  store.commit("setShowActionsMenu", true);
};
</script>
