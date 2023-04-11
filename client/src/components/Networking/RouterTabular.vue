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
        <th>IP Address</th>
        <th>Antennas</th>
        <th>Ports</th>
        <th>Dead ports</th>
        <th>Serial Number</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="router in routers"
        :key="router.id"
        :class="{
          isActive: isActiveId === router._id,
        }"
        @click="selectRouter(router._id)"
      >
        <!-- <td>
          <input
            type="checkbox"
            class="checkbox"
            :value="router._id"
            :checked="isActiveId === router._id"
            v-model="checkbox"
          />
        </td> -->
        <td></td>
        <td>{{ router.location }}</td>
        <td>{{ router.ipAddress }}</td>

        <td v-if="router.wireless">
          <Check class="filter-icon dark" />
        </td>
        <td v-else>
          <Close class="filter-icon dark" />
        </td>

        <td>{{ router.ports }}</td>
        <td>{{ router.deadPorts }}</td>
        <td>{{ router.serialNumber }}</td>
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

const routers = ref(computed(() => store.getters.getPaginatedData));
const { isLoading, fetchRouteData } = useFetchRouteData();

fetchRouteData("routers");

const selectRouter = (routerId) => {
  isActiveId.value = routerId;
  const data = routers.value.find((router) => router._id === routerId);
  store.dispatch("setShowActionsMenu", true);
  store.dispatch("setTransitData", {
    context: `${data.location} router`,
    route: "networking/routers",
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
