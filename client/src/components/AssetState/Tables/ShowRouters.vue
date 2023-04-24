<template>
  <Loader v-if="isLoading" />
  <NoData v-else-if="!isLoading && routers.length === 0" />
  <table v-else class="tabular">
    <thead>
      <tr>
        <th></th>
        <th>Location</th>
        <th>Model</th>
        <th>Antennas</th>
        <th>Ports</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(router, index) in routers"
        :key="router._id"
        :data-index="index"
        :class="{ isActive: isActiveId === router._id }"
        @click="selectRouter(router._id)"
      >
        <td>{{ router.location }}</td>
        <td>{{ router.model }}</td>
        <td v-if="router.wireless">
          <Check class="filter-icon dark" />
        </td>
        <td v-else>
          <Close class="filter-icon dark" />
        </td>

        <td>{{ router.ports }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
import Check from "vue-material-design-icons/Check.vue";
import Close from "vue-material-design-icons/Close.vue";

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
store.dispatch("setBaseApiRoute", `/torsk/${routeType}/devices/routers`);
store.dispatch("closeActionsMenu", false);

fetchData(`/torsk/${routeType}/networking/routers`, false);
const routers = computed(() => store.getters.getDbData);

const isActiveId = ref(0);

const selectRouter = (routerId) => {
  isActiveId.value = routerId;
  const data = routers.value.find((router) => router._id === routerId);
  store.dispatch("flushTransitFormData");
  store.dispatch("setTransitData", {
    assetStateReq: true,
    context: `${data.location} router`,
    route: "networking/routers",
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
