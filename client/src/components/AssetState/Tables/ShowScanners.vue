<template>
  <Loader v-if="isLoading" />
  <NoData v-else-if="!isLoading && scanners.length === 0" />
  <table v-else class="tabular">
    <thead>
      <tr>
        <th></th>
        <th>User</th>
        <th>Model</th>
        <th>Serial Number</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="scanner in scanners"
        :key="scanner._id"
        :class="{
          isActive: isActiveId === scanner._id,
        }"
        @click="selectScanner(scanner._id)"
      >
        <td></td>
        <td>{{ scanner.user }}</td>
        <td>{{ scanner.model }}</td>
        <td>{{ scanner.serialNumber }}</td>
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
store.dispatch("setBaseApiRoute", `/torsk/${routeType}/devices/scanners`);

fetchData(`/torsk/${routeType}/office-equipment/scanners`, false);
const scanners = computed(() => store.getters.getDbData);

const isActiveId = ref(0);

const selectScanner = (scannerId) => {
  isActiveId.value = scannerId;
  const data = scanners.value.find((scanner) => scanner._id === scannerId);
  store.dispatch("flushTransitFormData");
  store.dispatch("setTransitData", {
    assetStateReq: true,
    context: `${data.user} scanner`,
    route: "office_equipment/scanners",
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
