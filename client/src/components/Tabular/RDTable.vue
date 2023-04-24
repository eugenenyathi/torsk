<template>
  <Loader v-if="isLoading" />
  <NoData v-else-if="!isLoading && machines.length === 0" />
  <table v-else class="tabular">
    <thead>
      <tr>
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
        <th>Remote Address</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="machine in machines"
        :key="machine._id"
        :class="{
          isActive: isActiveId === machine._id,
        }"
        @click="selectMachine(machine._id)"
      >
        <td></td>
        <td>{{ machine.user }}</td>
        <td>{{ machine.address }}</td>
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
import { useRouter } from "vue-router";
import { ref, watch, computed } from "vue";

import useFetchRouteData from "@/composables/useFetchRouteData";

const props = defineProps({
  showReloadIcon: Boolean,
});

const emit = defineEmits(["openFilterList", "reload"]);

const store = useStore();
const router = useRouter();

store.dispatch("setBaseApiRoute", "/torsk/remote_desktop");
store.dispatch("closeActionsMenu", false);

const isActiveId = ref(0);

const machines = ref(computed(() => store.getters.getPaginatedData));
const { isLoading, fetchRouteData } = useFetchRouteData();

fetchRouteData();

const selectMachine = (machineId) => {
  isActiveId.value = machineId;
  const data = machines.value.find((machine) => machine._id === machineId);
  store.dispatch("flushTransitFormData");
  store.dispatch("setTransitData", {
    context: `${data.user} remote address`,
    route: "remote_desktop",
    ...data,
  });

  const route = `/remote/${machineId}`;
  router.push(route);

  store.dispatch("switchHeaderBtn", {
    showDeleteBtn: true,
    showEditBtn: false,
    showAddBtn: false,
  });
};

const showActionsMenu = computed(() => store.getters.showActionsMenu);

watch(showActionsMenu, (newValue, oldValue) => {
  if (newValue === false) {
    isActiveId.value = 0;
  }
});
</script>
