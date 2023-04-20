<template>
  <Loader v-if="isLoading" />
  <NoData v-else-if="!isLoading && machines.length === 0" />
  <table v-else class="tabular faulty">
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Model</th>
        <th>CPU</th>
        <th>RAM</th>
        <th>Storage</th>
      </tr>
    </thead>
    <tbody class="faulty">
      <tr v-for="machine in machines" :key="machine._id">
        <td></td>
        <td>{{ machine.machine }}</td>
        <td>{{ machine.model }}</td>
        <td>{{ machine.cpu }}</td>
        <td>{{ machine.ram }}</td>
        <td>{{ machine.storageGigs }} GB</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import Loader from "@/components/Loader";
import NoData from "@/components/NoData";

import useFetchData from "@/composables/useFetchData";
import { useStore } from "vuex";
import { computed } from "vue";
import { useRoute } from "vue-router";

const store = useStore();
const currentRoute = computed(() => useRoute().name.toLowerCase());

const { isLoading, fetchData } = useFetchData();

const machineType = currentRoute.value.split("-")[1];

fetchData("/torsk/faulty/devices", false);

const machines = computed(() => store.getters.getDbData[`${machineType}`]);
</script>
