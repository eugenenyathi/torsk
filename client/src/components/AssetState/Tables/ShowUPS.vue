<template>
  <Loader v-if="isLoading" />
  <NoData v-else-if="!isLoading && devices.length === 0" />
  <table v-else class="tabular">
    <thead>
      <tr>
        <th></th>
        <th>Connected Device</th>
        <th>Model</th>
        <th>Watts</th>
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
        <td>{{ device.connectedDevice }}</td>
        <td>{{ device.model }}</td>
        <td>{{ device.watts }}</td>
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
store.dispatch("setBaseApiRoute", `/torsk/${routeType}/devices/ups`);

fetchData(`/torsk/${routeType}/devices/ups`, false);
const devices = computed(() => store.getters.getDbData);

const isActiveId = ref(0);

const selectUps = (upsId) => {
  isActiveId.value = upsId;
  const data = devices.value.find((ups) => ups._id === upsId);
  store.dispatch("flushTransitFormData");
  store.dispatch("setTransitData", {
    assetStateReq: true,
    context: `${data.connectedDevice} ups`,
    route: "devices/ups",
    ...data,
  });
  store.dispatch("setGreyOutAction", { specs: true, update: true });
  store.dispatch("setShowActionsMenu", true);
};

const showActionsMenu = computed(() => store.getters.showActionsMenu);

watch(showActionsMenu, (newValue, oldValue) => {
  if (newValue === false) {
    isActiveId.value = 0;
  }
});
</script>
