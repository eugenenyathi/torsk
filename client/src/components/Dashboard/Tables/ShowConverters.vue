<template>
  <Loader v-if="isLoading" />
  <table v-else class="tabular">
    <thead>
      <tr>
        <th></th>
        <th>Location</th>
        <th>Model</th>
      </tr>
    </thead>
    <tbody class="faulty">
      <tr v-for="converter in converters" :key="converter.id">
        <td>{{ converter.location }}</td>
        <td>{{ converter.model }}</td>
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
const converters = computed(() => store.getters.getDbData.converters);
</script>
