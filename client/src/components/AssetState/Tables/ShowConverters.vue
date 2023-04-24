<template>
  <Loader v-if="isLoading" />
  <NoData v-else-if="!isLoading && converters.length === 0" />
  <table v-else class="tabular">
    <thead>
      <tr>
        <th></th>
        <th>Location</th>
        <th>Model</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(converter, index) in converters"
        :key="converter._id"
        :data-index="index"
        :class="{ isActive: isActiveId === converter._id }"
        @click="selectConverter(converter._id)"
      >
        <td>{{ converter.location }}</td>
        <td>{{ converter.model }}</td>
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
store.dispatch("setBaseApiRoute", `/torsk/${routeType}/devices/converters`);

fetchData(`/torsk/${routeType}/networking/converters`, false);
const converters = computed(() => store.getters.getDbData);

const isActiveId = ref(0);

const selectConverter = (converterId) => {
  isActiveId.value = converterId;
  const data = converters.value.find(
    (converter) => converter._id === converterId
  );
  store.dispatch("flushTransitFormData");
  store.dispatch("setTransitData", {
    assetStateReq: true,
    context: `${data.location} converter`,
    route: "networking/converters",
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
