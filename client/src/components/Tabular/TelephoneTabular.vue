<template>
  <Loader v-if="isLoading" />
  <table v-else class="tabular">
    <thead>
      <tr class="no-flex-second-child">
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
        <th>Extension</th>
        <th>Direct Line</th>
        <th>Model</th>
        <th>Serial Number</th>
        <!-- <th>Purchased</th> -->
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="telephone in telephones"
        :key="telephone._id"
        :class="{
          isActive: isActiveId === telephone._id,
        }"
        @click="selectTelephone(telephone._id)"
      >
        <td></td>
        <td>{{ telephone.user }}</td>
        <td>{{ telephone.extension }}</td>
        <td>{{ telephone.directLine }}</td>
        <td>{{ telephone.model }}</td>
        <td>{{ telephone.serialNumber }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import Search from "vue-material-design-icons/FilterOutline.vue";
import Reload from "vue-material-design-icons/Reload.vue";

import Loader from "../Loader";

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

store.dispatch("setBaseApiRoute", "/torsk/telephone");

const isActiveId = ref(0);

const telephones = ref(computed(() => store.getters.getPaginatedData));
const { isLoading, fetchRouteData } = useFetchRouteData();

fetchRouteData();

const selectTelephone = (telephoneId) => {
  isActiveId.value = telephoneId;
  const data = telephones.value.find(
    (telephone) => telephone._id === telephoneId
  );
  store.dispatch("flushTransitFormData");
  store.dispatch("setTransitData", {
    context: `${data.user} telephone line`,
    route: "telephone",
    ...data,
  });

  const route = `/telephones/${telephoneId}`;
  router.push(route);

  store.dispatch("setShowDeleteBtn", true);
};

const showActionsMenu = computed(() => store.getters.showActionsMenu);

watch(showActionsMenu, (newValue, oldValue) => {
  if (newValue === false) {
    isActiveId.value = 0;
  }
});
</script>
