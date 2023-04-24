<template>
  <Loader v-if="isLoading" />
  <NoData v-else-if="!isLoading && scanners.length === 0" />
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
        <!-- <td>
          <input
            type="checkbox"
            class="checkbox"
            :value="scanner.id"
            :checked="isActiveId === scanner.id"
            v-model="checkbox"
          />
        </td> -->
        <td></td>
        <td>{{ scanner.user }}</td>
        <td>{{ scanner.model }}</td>
        <td>{{ scanner.serialNumber }}</td>
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

const isActiveId = ref(0);

const scanners = ref(computed(() => store.getters.getPaginatedData));
const { isLoading, fetchRouteData } = useFetchRouteData();

fetchRouteData("scanners");

const selectScanner = (scannerId) => {
  isActiveId.value = scannerId;
  const data = scanners.value.find((scanner) => scanner._id === scannerId);
  store.dispatch("setShowActionsMenu", true);
  store.dispatch("setTransitData", {
    assetStateReq: false,
    context: `${data.user} scanner`,
    route: "office_equipment/scanners",
    ...data,
  });
  store.dispatch("setGreyOutAction", { specs: true });
};

const showActionsMenu = computed(() => store.getters.showActionsMenu);

watch(showActionsMenu, (newValue, oldValue) => {
  if (newValue === false) {
    isActiveId.value = 0;
  }
});
</script>
