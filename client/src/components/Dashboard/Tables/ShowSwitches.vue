<template>
  <Loader v-if="isLoading" />
  <table v-else class="tabular">
    <thead>
      <tr>
        <th></th>
        <th>Location</th>
        <th>Model</th>
        <th>Ports</th>
      </tr>
    </thead>
    <tbody class="faulty">
      <tr v-for="device in switches" :key="device.id">
        <td></td>
        <td>{{ device.location }}</td>
        <td>{{ device.model }}</td>
        <td>{{ device.ports }}</td>
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

fetchData("/torsk/faulty/networking", false);
const switches = computed(() => store.getters.getDbData.switches);
</script>
