<template>
  <Loader v-if="isLoading" />
  <NoData v-else-if="!isLoading && converters.length === 0" />
  <table v-else class="tabular">
    <thead>
      <tr>
        <!-- <th class="checkbox">
          <input type="checkbox" class="checkbox" />
        </th> -->
        <th></th>
        <th>Location</th>
        <th>Model</th>
        <th>Serial Number</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="converter in converters"
        :key="converter._id"
        :class="{
          isActive: isActiveId === converter._id,
        }"
        @click="selectConverter(converter._id)"
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
        <td>{{ converter.location }}</td>
        <td>{{ converter.model }}</td>
        <td>{{ converter.serialNumber }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import Loader from "@/components/Loader";
import NoData from "@/components/NoData";

import { useStore } from "vuex";
import { ref, watch, computed } from "vue";

import useFetchRouteData from "@/composables/useFetchRouteData";

const store = useStore();
store.dispatch("switchHeaderBtn", { showEditBtn: true });

const isActiveId = ref(0);

const converters = ref(computed(() => store.getters.getPaginatedData));
const { isLoading, fetchRouteData } = useFetchRouteData();

fetchRouteData("converters");

const selectConverter = (converterId) => {
  isActiveId.value = converterId;
  const data = converters.value.find(
    (converter) => converter._id === converterId
  );
  store.dispatch("setShowActionsMenu", true);
  store.dispatch("setTransitData", {
    assetStateReq: false,
    context: `${data.location} converter`,
    route: "networking/converters",
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
