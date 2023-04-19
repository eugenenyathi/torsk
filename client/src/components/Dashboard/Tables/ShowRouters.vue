<template>
  <Loader v-if="isLoading" />
  <table v-else class="tabular">
    <thead>
      <tr>
        <th></th>
        <th>Location</th>
        <th>Model</th>
        <th>Antennas</th>
        <th>Ports</th>
      </tr>
    </thead>
    <tbody class="faulty">
      <tr v-for="router in routers" :key="router.id">
        <td>{{ router.location }}</td>
        <td>{{ router.model }}</td>
        <td v-if="router.wireless">
          <Check class="filter-icon dark" />
        </td>
        <td v-else>
          <Close class="filter-icon dark" />
        </td>

        <td>{{ router.ports }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
import Check from "vue-material-design-icons/Check.vue";
import Close from "vue-material-design-icons/Close.vue";

import Loader from "@/components/Loader";

import useFetchData from "@/composables/useFetchData";
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();
const { isLoading, fetchData } = useFetchData();

fetchData("/torsk/faulty/networking", false);
const routers = computed(() => store.getters.getDbData.routers);
</script>
