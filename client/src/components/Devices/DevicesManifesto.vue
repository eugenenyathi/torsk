<template>
  <TabularC
    v-if="tabular === 'computer'"
    :machines="currentDeviceData"
    :showReloadIcon="showReloadIcon"
    @open="openActionsMenu"
    @openFilterList="toggleFilterMenu('open')"
    @reload="reloadData"
  />

  <TabularM
    v-else
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
import TabularC from "./Tabular-C.vue";
import TabularM from "./Tabular-M.vue";
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

const route = computed(() => useRoute().name);
const currentRoute = route.value.toLowerCase();

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
    if (props.anchor === "desktops") {
      const res = await axios("/desktops");
      deviceData.value = res.data;
    } else if (props.anchor === "laptops") {
      const res = await axios("/desktops");
      deviceData.value = res.data;
    } else if (props.anchor === "tablets") {
      const res = await axios("/tablets");
      deviceData.value = res.data;
    } else if (props.anchor === "phones") {
      const res = await axios("/tablets");
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
