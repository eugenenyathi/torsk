<template>
  <Loader v-if="isLoading" />
  <NoData v-else-if="!isLoading && machines.length === 0" />
  <table v-else class="tabular">
    <thead>
      <tr>
        <th></th>
        <th>User</th>
        <th>Model</th>
        <th>Multi-purpose</th>
        <th>Duplex</th>
        <th>Cartridge</th>
      </tr>
    </thead>
    <tbody class="faulty">
      <tr v-for="printer in printers" :key="printer._id">
        <td></td>
        <td>{{ printer.user }}</td>
        <td>{{ printer.model }}</td>

        <td v-if="printer.multipurpose">
          <Check class="filter-icon dark" />
        </td>
        <td v-else>
          <Close class="filter-icon dark" />
        </td>

        <td v-if="printer.duplex">
          <Check class="filter-icon dark" />
        </td>
        <td v-else>
          <Close class="filter-icon dark" />
        </td>

        <td>{{ printer.cartridge }}</td>
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

const store = useStore();
const { isLoading, fetchData } = useFetchData();

fetchData("/torsk/faulty/office-equipment", false);
const printers = computed(() => store.getters.getDbData.printers);
</script>
