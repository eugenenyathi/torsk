<template>
  <Loader v-if="isLoading" />
  <NoData v-else-if="!isLoading && switches.length === 0" />
  <table v-else class="tabular">
    <thead>
      <tr>
        <!-- <th class="checkbox">
          <input type="checkbox" class="checkbox" />
        </th> -->
        <th></th>
        <th>
          Location
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
        <th>Ports</th>
        <th>Dead ports</th>
        <th>Serial Number</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="device in switches"
        :key="device._id"
        :class="{
          isActive: isActiveId === device._id,
        }"
        @click="selectSwitch(device._id)"
      >
        <!-- <td>
          <input
            type="checkbox"
            class="checkbox"
            :value="machine._id"
            :checked="isActiveId === machine._id"
            v-model="checkbox"
          />
        </td> -->
        <td></td>
        <td>{{ device.location }}</td>
        <td>{{ device.model }}</td>
        <td>{{ device.ports }}</td>
        <td>{{ device.deadPorts }}</td>
        <td>{{ device.serialNumber }}</td>
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

const props = defineProps({
  showReloadIcon: Boolean,
});

const emit = defineEmits(["openFilterList", "reload"]);
const store = useStore();
store.dispatch("switchHeaderBtn", { showEditBtn: true });

const isActiveId = ref(0);

const switches = ref(computed(() => store.getters.getPaginatedData));
const { isLoading, fetchRouteData } = useFetchRouteData();

fetchRouteData("switches");

const selectSwitch = (switchId) => {
  isActiveId.value = switchId;
  const data = switches.value.find((device) => device._id === switchId);
  store.dispatch("setGreyOutAction", { specs: true });
  store.dispatch("setShowActionsMenu", true);
  store.dispatch("setTransitData", {
    assetStateReq: false,
    context: `${data.location} switch`,
    route: "networking/switches",
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
