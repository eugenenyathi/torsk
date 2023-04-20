<template>
  <Loader v-if="isLoading" />
  <NoData v-else-if="!isLoading && networks.length === 0" />
  <table v-else class="tabular">
    <thead>
      <tr>
        <!-- <th class="checkbox">
          <input type="checkbox" class="checkbox" />
        </th> -->
        <th></th>
        <th>Router Location</th>
        <th>SSID</th>
        <th>Password</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="network in networks"
        :key="network._id"
        :class="{
          isActive: isActiveId === network._id,
        }"
        @click="selectNetwork(network._id)"
      >
        <!-- <td>
          <input
            type="checkbox"
            class="checkbox"
            :value="machine.id"
            :checked="isActiveId === machine._id"
            v-model="checkbox"
          />
        </td> -->
        <td></td>
        <td :class="{ 'upper-case': network.location === 'it' }">
          {{ network.location }}
        </td>
        <td class="upper-case">{{ network.ssid }}</td>
        <td class="lower-case">{{ network.password }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import Loader from "@/components/Loader";
import NoData from "@/components/NoData";

import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref, watch, computed } from "vue";

import useFetchRouteData from "@/composables/useFetchRouteData";

const store = useStore();
store.dispatch("switchHeaderBtn", { showEditBtn: true });

const router = useRouter();

const isActiveId = ref(0);

const networks = ref(computed(() => store.getters.getPaginatedData));
const { isLoading, fetchRouteData } = useFetchRouteData();

fetchRouteData("wifi");

const selectNetwork = (networkId) => {
  isActiveId.value = networkId;
  const data = networks.value.find((network) => network._id === networkId);
  store.dispatch("switchHeaderBtn", {
    showDeleteBtn: true,
    showEditBtn: false,
    showAddBtn: false,
  });
  store.dispatch("setTransitData", {
    context: `${data.ssid} wifi`,
    route: "networking/wifi",
    ...data,
  });
  router.push(`/networking/wifi/${data._id}`);
};

const showActionsMenu = computed(() => store.getters.showActionsMenu);

watch(showActionsMenu, (newValue, oldValue) => {
  if (newValue === false) {
    isActiveId.value = 0;
  }
});
</script>
