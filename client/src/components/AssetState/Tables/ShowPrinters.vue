<template>
  <Loader v-if="isLoading" />
  <NoData v-else-if="!isLoading && printers.length === 0" />
  <table v-else class="tabular">
    <thead>
      <tr>
        <th></th>
        <th>User</th>
        <th>Model</th>
        <th>Multi-purpose</th>
        <th>Cartridge</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(printer, index) in printers"
        :key="printer._id"
        :data-index="index"
        :class="{ isActive: isActiveId === printer._id }"
        @click="selectPrinter(printer._id)"
      >
        <td></td>
        <td>{{ printer.user }}</td>
        <td>{{ printer.model }}</td>

        <td v-if="printer.multipurpose">
          <Check class="filter-icon dark" />
        </td>
        <td v-else>
          <Close class="filter-icon dark" />
        </td>

        <td>{{ printer.cartridge }}</td>
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
store.dispatch(
  "setBaseApiRoute",
  `/torsk/${routeType}/office_equipment/printers`
);

fetchData(`/torsk/${routeType}/office_equipment/printers`, false);
const printers = computed(() => store.getters.getDbData);

const isActiveId = ref(0);

const selectPrinter = (printerId) => {
  isActiveId.value = printerId;
  const data = printers.value.find((printer) => printer._id === printerId);
  store.dispatch("flushTransitFormData");
  store.dispatch("setTransitData", {
    assetStateReq: true,
    context: `${data.user} printer`,
    route: "office_equipment/printers",
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
