<template>
  <Loader v-if="isLoading" />
  <NoData v-else-if="!isLoading && devices.length === 0" />
  <table v-else class="tabular">
    <thead>
      <tr>
        <!-- <th class="checkbox">
          <input type="checkbox" class="checkbox" />
        </th> -->
        <th></th>
        <th>
          User

          <Search
            v-if="!showReloadIcon"
            class="filter-icon"
            @click="$emit('openFilterList')"
          />
          <Reload
            v-if="showReloadIcon"
            class="filter-icon"
            @click="$emit('reload')"
          />
        </th>
        <th>Model</th>
        <th>OS</th>
        <th>Storage</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="device in devices"
        :key="device._id"
        :class="{
          isActive: isActiveId === device._id,
        }"
        @click="selectDevice(device._id)"
      >
        <!-- <td>
          <input
            type="checkbox"
            class="checkbox"
            :value="device.id"
            :checked="isActiveId === device._id"
            v-model="checkbox"
          />
        </td> -->
        <td></td>
        <td>{{ device.user }}</td>
        <td>{{ device.model }}</td>
        <td>{{ device.os }}</td>
        <td>{{ device.storage }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import Search from "vue-material-design-icons/FilterOutline.vue";
import Reload from "vue-material-design-icons/Reload.vue";

import Loader from "@/components/Loader";
import NoData from "@/components/NoData";

import { useStore } from "vuex";
import { ref, watch, computed } from "vue";

import useFetchRouteData from "@/composables/useFetchRouteData";

import { useRoute } from "vue-router";

const currentRoute = computed(() => useRoute().name.toLowerCase());

const props = defineProps({
  showReloadIcon: Boolean,
});

const emit = defineEmits(["openFilterList", "reload"]);
const store = useStore();
store.dispatch("setBaseApiRoute", "/torsk/devices/mobiles");
store.dispatch("closeActionsMenu", false);

const isActiveId = ref(0);

const devices = ref(computed(() => store.getters.getPaginatedData));
const { isLoading, fetchRouteData } = useFetchRouteData();

fetchRouteData(currentRoute.value.substring(0, currentRoute.value.length - 1));

const selectDevice = (deviceId) => {
  isActiveId.value = deviceId;
  const data = devices.value.find((device) => device._id === deviceId);
  store.dispatch("setShowActionsMenu", true);
  store.dispatch("setTransitData", {
    assetStateReq: false,
    context: `${data.user} device`,
    route: "devices/mobile",
    ...data,
  });
};

const showActionsMenu = computed(() => store.getters.showActionsMenu);

watch(showActionsMenu, (newValue, oldValue) => {
  if (newValue === false) {
    isActiveId.value = 0;
  }
});
</script>
