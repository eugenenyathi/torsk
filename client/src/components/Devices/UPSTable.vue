<template>
  <Loader v-if="isLoading" />
  <NoData v-else-if="!isLoading && upSuppliers.length === 0" />
  <table v-else class="tabular">
    <thead>
      <tr>
        <!-- <th class="checkbox">
          <input type="checkbox" class="checkbox" />
        </th> -->
        <th></th>
        <th>
          Connected Device
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
        <th>Watts</th>
        <th>Serial Number</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(ups, index) in upSuppliers"
        :key="ups._id"
        :data-index="index"
        :class="{ isActive: isActiveId === ups._id }"
        @click="selectUps(ups._id)"
      >
        <!-- <td>
          <input
            type="checkbox"
            class="checkbox"
            :value="ups.id"
            :checked="isActiveId === ups.id"
            v-model="checkbox"
          />
        </td> -->
        <td></td>
        <td>{{ ups.connectedDevice }}</td>
        <td>{{ ups.model }}</td>
        <td>{{ ups.watts }}</td>
        <td>{{ ups.serialNumber }}</td>
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
store.dispatch("setBaseApiRoute", "/torsk/devices/ups");

const isActiveId = ref(0);

const upSuppliers = ref(computed(() => store.getters.getPaginatedData));
const { isLoading, fetchRouteData } = useFetchRouteData();

fetchRouteData();

const selectUps = (upsId) => {
  isActiveId.value = upsId;
  const data = upSuppliers.value.find((ups) => ups._id === upsId);
  store.dispatch("setGreyOutAction", { specs: true });
  store.dispatch("setShowActionsMenu", true);
  store.dispatch("flushTransitFormData");
  store.dispatch("setTransitData", {
    context: `${data.connectedDevice} ups`,
    route: "devices/ups",
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
