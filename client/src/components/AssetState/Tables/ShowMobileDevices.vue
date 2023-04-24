<template>
  <Loader v-if="isLoading" />
  <NoData v-else-if="!isLoading && devices.length === 0" />
  <table v-else class="tabular">
    <thead>
      <tr>
        <th></th>
        <th>User</th>
        <th>Model</th>
        <th>OS</th>
        <th>Storage</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(device, index) in devices"
        :key="device._id"
        :data-index="index"
        :class="{ isActive: isActiveId === device._id }"
        @click="selectDevice(device._id)"
      >
        <td></td>
        <td>{{ device.user }}</td>
        <td>{{ device.model }}</td>
        <td>{{ device.os }}</td>
        <td>{{ device.storageGigs }} GB</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import Loader from "@/components/Loader";
import NoData from "@/components/NoData";

import useFetchData from "@/composables/useFetchData";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { ref, computed, watch } from "vue";

const store = useStore();

const { isLoading, fetchData } = useFetchData();

const currentRoute = computed(() => useRoute().name.toLowerCase());
const routeType = currentRoute.value.split("-")[0];
const deviceType = currentRoute.value.split("-")[1];
store.dispatch("setBaseApiRoute", `/torsk/${routeType}/devices/${deviceType}`);
store.dispatch("closeActionsMenu", false);

fetchData(`/torsk/${routeType}/devices/${deviceType}`, false);
const devices = computed(() => store.getters.getDbData);

const isActiveId = ref(0);

const selectDevice = (deviceId) => {
  isActiveId.value = deviceId;
  const data = devices.value.find((device) => device._id === deviceId);
  store.dispatch("flushTransitFormData");
  store.dispatch("setTransitData", {
    assetStateReq: true,
    context: `${data.user} device`,
    route: "devices/mobile",
    ...data,
  });
  store.dispatch("setGreyOutAction", { specs: false, update: true });
  store.dispatch("setShowActionsMenu", true);
};

const showActionsMenu = computed(() => store.getters.showActionsMenu);

watch(showActionsMenu, (newValue, oldValue) => {
  if (newValue === false) {
    isActiveId.value = 0;
  }
});
</script>
