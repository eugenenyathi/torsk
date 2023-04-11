<template>
  <Loader v-if="isLoading" />
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
        <th>Multi-purpose</th>
        <th>Duplex</th>
        <th>Networked</th>
        <th>Cartridge</th>
        <th>Serial Number</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="printer in printers"
        :key="printer._id"
        :class="{
          isActive: isActiveId === printer._id,
        }"
        @click="selectPrinter(printer._id)"
      >
        <!-- <td>
          <input
            type="checkbox"
            class="checkbox"
            :value="printer.id"
            :checked="isActiveId === printer.id"
            v-model="checkbox"
          />
        </td> -->
        <td></td>
        <td>{{ printer.user }}</td>
        <td>{{ printer.model }}</td>

        <td v-if="printer.multipurpose">
          <Check class="filter-icon dark" />
        </td>
        <td v-else>
          <Close class="filter-icon dark" />
        </td>

        <td v-if="printer.duplex">
          <Check class="filter-icon dark" />
        </td>
        <td v-else>
          <Close class="filter-icon dark" />
        </td>

        <td v-if="printer.networked">
          <Check class="filter-icon dark" />
        </td>
        <td v-else>
          <Close class="filter-icon dark" />
        </td>

        <td>{{ printer.cartridge }}</td>
        <td>{{ printer.serialNumber }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import Search from "vue-material-design-icons/FilterOutline.vue";
import Reload from "vue-material-design-icons/Reload.vue";
import Check from "vue-material-design-icons/Check.vue";
import Close from "vue-material-design-icons/Close.vue";

import Loader from "../Loader";

import { useStore } from "vuex";
import { ref, watch, computed } from "vue";

import useFetchRouteData from "@/composables/useFetchRouteData";

const props = defineProps({
  showReloadIcon: Boolean,
});

const emit = defineEmits(["openFilterList", "reload"]);
const store = useStore();

const isActiveId = ref(0);

const printers = ref(computed(() => store.getters.getPaginatedData));
const { isLoading, fetchRouteData } = useFetchRouteData();

fetchRouteData("printers");

const selectPrinter = (printerId) => {
  isActiveId.value = printerId;
  const data = printers.value.find((printer) => printer._id === printerId);
  store.dispatch("setShowActionsMenu", true);
  store.dispatch("setTransitData", {
    context: `${data.user}'s printer`,
    route: "networking/printers",
    ...data,
  });
  store.dispatch("setGreyOutAction", true);
};

const showActionsMenu = computed(() => store.getters.showActionsMenu);

watch(showActionsMenu, (newValue, oldValue) => {
  if (newValue === false) {
    isActiveId.value = 0;
  }
});
</script>
