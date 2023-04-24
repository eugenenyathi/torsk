<template>
  <Loader v-if="isLoading" />
  <NoData v-else-if="!isLoading && switches.length === 0" />
  <table v-else class="tabular">
    <thead>
      <tr>
        <th></th>
        <th>Location</th>
        <th>Model</th>
        <th>Ports</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(device, index) in switches"
        :key="device._id"
        :data-index="index"
        :class="{ isActive: isActiveId === device._id }"
        @click="selectSwitch(device._id)"
      >
        <td></td>
        <td>{{ device.location }}</td>
        <td>{{ device.model }}</td>
        <td>{{ device.ports }}</td>
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
store.dispatch("setBaseApiRoute", `/torsk/${routeType}/devices/switches`);

fetchData(`/torsk/${routeType}/networking/switches`, false);
const switches = computed(() => store.getters.getDbData);

const isActiveId = ref(0);

const selectSwitch = (switchId) => {
  isActiveId.value = switchId;
  const data = switches.value.find((devices) => devices._id === switchId);
  store.dispatch("flushTransitFormData");
  store.dispatch("setTransitData", {
    context: `${data.location} switch`,
    route: "networking/switches",
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
