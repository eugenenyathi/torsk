<template>
  <Loader v-if="isLoading" />
  <NoData v-else-if="!isLoading && servers.length === 0" />
  <table v-else class="tabular">
    <thead>
      <tr>
        <!-- <th class="checkbox">
          <input type="checkbox" class="checkbox" />
        </th> -->
        <th></th>
        <th>Name</th>
        <th>Location</th>
        <th>Serves</th>
        <th>OS</th>
        <th>IP Address</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(server, index) in servers"
        :key="server._id"
        :data-index="index"
        :class="{ isActive: isActiveId === server._id }"
        @click="selectServer(server._id)"
      >
        <!-- <td>
          <input
            type="checkbox"
            class="checkbox"
            :value="server.id"
            :checked="isActiveId === server.id"
            v-model="checkbox"
          />
        </td> -->
        <td></td>
        <td>{{ server.machine }}</td>
        <td>{{ server.location }}</td>
        <td>{{ server.serves.toString() }}</td>
        <td>{{ server.os }}</td>
        <td>{{ server.ipAddress }}</td>
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

import { useRoute } from "vue-router";

const currentRoute = computed(() => useRoute().name.toLowerCase());

const props = defineProps({
  showReloadIcon: Boolean,
});

const emit = defineEmits(["openFilterList", "reload"]);
const store = useStore();
store.dispatch("setBaseApiRoute", "/torsk/devices/server");
store.dispatch("closeActionsMenu", false);

const isActiveId = ref(0);

const servers = ref(computed(() => store.getters.getPaginatedData));
const { isLoading, fetchRouteData } = useFetchRouteData();

fetchRouteData("");

const selectServer = (serverId) => {
  isActiveId.value = serverId;
  const data = servers.value.find((server) => server._id === serverId);
  store.dispatch("setShowActionsMenu", true);
  store.dispatch("flushTransitFormData");
  store.dispatch("setTransitData", {
    assetStateReq: false,
    context: `${data.machine} server`,
    route: "devices/server",
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
