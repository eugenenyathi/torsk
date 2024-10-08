<template>
  <Loader v-if="isLoading" />
  <NoData v-else-if="!isLoading && servers.length === 0" />
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
        v-for="(server, index) in servers"
        :key="server._id"
        :data-index="index"
        :class="{ isActive: isActiveId === server._id }"
        @click="selectServer(server._id)"
      >
        <td></td>
        <td>{{ server.machine }}</td>
        <td>{{ server.model }}</td>
        <td>{{ server.cpu }}</td>
        <td>{{ server.ram }}</td>
        <td>{{ server.storageGigs }} GB</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import Loader from "@/components/Loader";
import NoData from "@/components/NoData";

import useFetchData from "@/composables/useFetchData";
import { useStore } from "vuex";
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";

const store = useStore();
const { isLoading, fetchData } = useFetchData();
const currentRoute = computed(() => useRoute().name.toLowerCase());
const routeType = currentRoute.value.split("-")[0];
/*leverage the baseApiRoute for purpose of 
getting an entire updated list after the
individual update*/
store.dispatch("setBaseApiRoute", `/torsk/${routeType}/devices/servers`);
store.dispatch("closeActionsMenu", false);

fetchData(`/torsk/${routeType}/devices/servers`, false);
const servers = computed(() => store.getters.getDbData);

const isActiveId = ref(0);

const selectServer = (serverId) => {
  isActiveId.value = serverId;
  const data = servers.value.find((server) => server._id === serverId);
  store.dispatch("flushTransitFormData");
  store.dispatch("setTransitData", {
    assetStateReq: true,
    context: `${data.machine}`,
    route: "devices/server",
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
