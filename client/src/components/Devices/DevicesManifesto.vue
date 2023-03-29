<template>
  <Loader v-if="isLoading" />
  <TabularC
    v-if="tabular === 'computer' && !isLoading"
    :machines="currentDeviceData"
    :showReloadIcon="showReloadIcon"
    @open="openActionsMenu"
    @openFilterList="toggleFilterMenu('open')"
    @reload="reloadData"
  />

  <TabularM
    v-else-if="tabular === 'mobile' && !isLoading"
    :machines="currentDeviceData"
    :showReloadIcon="showReloadIcon"
    @open="openActionsMenu"
    @openFilterList="toggleFilterMenu('open')"
    @reload="reloadData"
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
import TabularC from "./Tabular-C.vue";
import TabularM from "./Tabular-M.vue";
import Pagination from "../Pagination";
import FilterList from "../FilterList";
import Loader from "../Loader";

import useAxiosError from "../../composables/useAxiosError.js";
import usePagination from "../../composables/usePagination.js";

import FilterFn from "../../helpers/FilterFn.js";

import axios from "axios";
import { useStore } from "vuex";
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";

const route = computed(() => useRoute().name);
const currentRoute = route.value.toLowerCase();

const props = defineProps(["anchor", "tabular", "device"]);
const store = useStore();

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

    if (props.anchor === "desktops") {
      let res = await axios("/torsk/devices/machines/desktop");
      deviceData.value = res.data.machines;
    } else if (props.anchor === "laptops") {
      let res = await axios("/torsk/devices/machines/laptop");
      deviceData.value = res.data.machines;
    } else if (props.anchor === "tablets") {
      let res = await axios("/torsk/devices/mobiles/tablet");
      deviceData.value = res.data.devices;
    } else if (props.anchor === "phones") {
      let res = await axios("/torsk/devices/mobiles/cellphone");
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
const openActionsMenu = () => {
  store.commit("setShowActionsMenu", true);
};
</script>
