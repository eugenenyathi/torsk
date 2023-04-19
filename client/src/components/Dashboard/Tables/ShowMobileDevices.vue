<template>
  <Loader v-if="isLoading" />
  <table v-else class="tabular faulty">
    <thead>
      <tr>
        <th></th>
        <th>User</th>
        <th>Model</th>
        <th>OS</th>
        <th>Storage</th>
      </tr>
    </thead>
    <tbody class="faulty">
      <tr v-for="device in devices" :key="device._id">
        <td></td>
        <td>{{ device.user }}</td>
        <td>{{ device.model }}</td>
        <td>{{ device.os }}</td>
        <td>{{ device.storageGigs }} GB</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import Loader from "@/components/Loader";
import useFetchData from "@/composables/useFetchData";
import { useStore } from "vuex";
import { computed } from "vue";
import { useRoute } from "vue-router";

const store = useStore();
const currentRoute = computed(() => useRoute().name.toLowerCase());

const { isLoading, fetchData } = useFetchData();

const deviceType = currentRoute.value.split("-")[1];

fetchData("/torsk/faulty/devices", false);
const devices = computed(() => store.getters.getDbData[`${deviceType}`]);
</script>
