<template>
  <Loader v-if="isLoading" />
  <RouterTabular
    v-if="tabular === 'routers' && !isLoading"
    :machines="currentDeviceData"
    :showReloadIcon="showReloadIcon"
    @open="openActionsMenu"
    @openFilterList="toggleFilterMenu('open')"
    @reload="reloadData"
  />

  <SwitchTabular
    v-else-if="tabular === 'switches' && !isLoading"
    :machines="currentDeviceData"
    :showReloadIcon="showReloadIcon"
    @open="openActionsMenu"
    @openFilterList="toggleFilterMenu('open')"
    @reload="reloadData"
  />

  <ConvTabular
    v-else-if="tabular === 'converters' && !isLoading"
    :machines="currentDeviceData"
    @open="openActionsMenu"
  />

  <WifiTabular
    v-else-if="tabular === 'wifi' && !isLoading"
    :machines="currentDeviceData"
    @open="openActionsMenu"
  />

  <Pagination :pageNumbers="pageNumbers" @currentPage="currentPage" />

  <teleport to="#port-modal">
    <Transition name="popup" appear>
      <FilterList
        :device="device"
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
import ConvTabular from "./ConvTabular.vue";
import WifiTabular from "./WifiTabular.vue";
import Pagination from "../Pagination";
import FilterList from "../FilterList";
import Loader from "../Loader";

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
const isLoading = ref(false);
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
    isLoading.value = true;
    if (props.anchor === "routers") {
      const res = await axios("/torsk/networking/device/router");
      deviceData.value = res.data.devices;
    } else if (props.anchor === "switches") {
      const res = await axios("/torsk/networking/device/switch");
      deviceData.value = res.data.devices;
    } else if (props.anchor === "converters") {
      const res = await axios("/torsk/networking/device/converter");
      deviceData.value = res.data.devices;
    } else if (props.anchor === "wifi") {
      const res = await axios("/torsk/networking/device/wifi");
      deviceData.value = res.data.devices;
    }

    isLoading.value = false;
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
const openActionsMenu = (machineId) => {
  store.commit("setShowActionsMenu", true);
};
</script>
