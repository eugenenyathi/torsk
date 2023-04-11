<template>
  <Loader v-if="isLoading" />
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
import Loader from "../Loader";

import { useStore } from "vuex";
import { ref, watch, computed } from "vue";

import useFetchRouteData from "@/composables/useFetchRouteData";

const store = useStore();

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
    context: `${data.location} converter`,
    route: "networking/converters",
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
