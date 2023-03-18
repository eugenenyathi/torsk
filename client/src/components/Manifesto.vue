<template>
  <RDTabular
    v-if="tabular === 'remotedesktop'"
    :machines="currentDeviceData"
    :showReloadIcon="showReloadIcon"
    @openFilterList="toggleFilterMenu('open')"
    @reload="reloadData"
  />

  <EmailsTabular
    v-if="tabular === 'emails'"
    :machines="currentDeviceData"
    :showReloadIcon="showReloadIcon"
    @open="openActionsMenu"
    @openFilterList="toggleFilterMenu('open')"
    @reload="reloadData"
  />

  <SoftwareTabular
    v-if="tabular === 'softwares'"
    :softwares="currentDeviceData"
    @open="openActionsMenu"
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
import EmailsTabular from "./Tabular/EmailsTabular.vue";
import RDTabular from "./Tabular/RDTabular.vue";
import SoftwareTabular from "./Tabular/SoftwareTabular.vue";

import Pagination from "./Pagination";
import FilterList from "./FilterList";

import useAxiosError from "../composables/useAxiosError.js";
import usePagination from "../composables/usePagination.js";

import ActiveChildRoute from "../helpers/ActiveChildRoute.js";
import FilterFn from "../helpers/FilterFn.js";

import axios from "axios";
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const currentRoute = computed(() => useRoute().name);

const props = defineProps(["anchor", "tabular", "device"]);
const store = useStore();

store.dispatch("setShowDeleteBtn", false);

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

      console.log(res.data);
    } else if (props.anchor === "remotedesktop") {
      const res = await axios("/desktops");
      deviceData.value = res.data;
    } else if (props.anchor === "emails") {
      const res = await axios("/emails");
      deviceData.value = res.data;
    } else if (props.anchor === "softwares") {
      const res = await axios("/softwares");
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
const openActionsMenu = (machineId) => {
  store.commit("setShowActionsMenu", {
    route: "tablets",
    deviceId: machineId,
    toggleState: true,
  });
};
</script>
