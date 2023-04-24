<template>
  <Loader v-if="isLoading" />
  <NoData v-else-if="!isLoading && machines.length === 0" />
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
        <th>Machine</th>
        <th>OS</th>
        <th>Ms Office</th>
        <th>RAM</th>
        <!-- <th>Purchased</th> -->
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
        <!-- <td>
          <input
            type="checkbox"
            class="checkbox"
            :value="machine.id"
            :checked="isActiveId === machine.id"
            v-model="checkbox"
          />
        </td> -->
        <td></td>
        <td>{{ machine.user }}</td>
        <td>{{ machine.machine }}</td>
        <td>{{ machine.os }}</td>
        <td>{{ machine.office }}</td>
        <td>{{ machine.ram }}</td>
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
store.dispatch("setBaseApiRoute", "/torsk/devices/machines");
store.dispatch("closeActionsMenu", false);

const isActiveId = ref(0);

const machines = ref(computed(() => store.getters.getPaginatedData));
const { isLoading, fetchRouteData } = useFetchRouteData();

fetchRouteData(currentRoute.value.substring(0, currentRoute.value.length - 1));

const selectMachine = (machineId) => {
  isActiveId.value = machineId;
  const data = machines.value.find((machine) => machine._id === machineId);
  store.dispatch("setShowActionsMenu", true);
  store.dispatch("flushTransitFormData");
  store.dispatch("setTransitData", {
    assetStateReq: false,
    context: `${data.user} machine`,
    route: "devices/machine",
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
