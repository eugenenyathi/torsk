<template>
  <Loader v-if="isLoading" />
  <NoData v-else-if="!isLoading && machines.length === 0" />
  <table v-else class="tabular">
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Model</th>
        <th>CPU</th>
        <th>RAM</th>
        <th>Storage</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(machine, index) in machines"
        :key="machine._id"
        :data-index="index"
        :class="{ isActive: isActiveId === machine._id }"
        @click="selectMachine(machine._id)"
      >
        <td></td>
        <td>{{ machine.machine }}</td>
        <td>{{ machine.model }}</td>
        <td>{{ machine.cpu }}</td>
        <td>{{ machine.ram }}</td>
        <td>{{ machine.storageGigs }} GB</td>
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
const machineType = currentRoute.value.split("-")[1];
const routeType = currentRoute.value.split("-")[0];
store.dispatch("setBaseApiRoute", `/torsk/${routeType}/devices/${machineType}`);

fetchData(`/torsk/${routeType}/devices/${machineType}`, false);

const machines = computed(() => store.getters.getDbData);

const isActiveId = ref(0);

const selectMachine = (machineId) => {
  isActiveId.value = machineId;
  const data = machines.value.find((machine) => machine._id === machineId);
  store.dispatch("flushTransitFormData");
  store.dispatch("setTransitData", {
    assetStateReq: true,
    context: `${data.machine} machine`,
    route: "devices/machine",
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
