<template>
  <Loader v-if="isLoading" />
  <table v-else class="tabular faulty">
    <thead>
      <tr>
        <th></th>
        <th>Connected Device</th>
        <th>Model</th>
        <th>Watts</th>
      </tr>
    </thead>
    <tbody class="faulty">
      <tr v-for="device in devices" :key="device._id">
        <td></td>
        <td>{{ device.connectedDevice }}</td>
        <td>{{ device.model }}</td>
        <td>{{ device.watts }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import Loader from "@/components/Loader";
import useFetchData from "@/composables/useFetchData";
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();
const { isLoading, fetchData } = useFetchData();

fetchData("/torsk/faulty/devices", false);
const devices = computed(() => store.getters.getDbData.upSuppliers);
</script>
