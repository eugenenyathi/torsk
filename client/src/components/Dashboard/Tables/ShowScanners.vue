<template>
  <Loader v-if="isLoading" />
  <NoData v-else-if="!isLoading && machines.length === 0" />
  <table v-else class="tabular">
    <thead>
      <tr>
        <!-- <th class="checkbox">
          <input type="checkbox" class="checkbox" />
        </th> -->
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
        <th>Model</th>
        <th>Serial Number</th>
      </tr>
    </thead>
    <tbody class="faulty">
      <tr
        v-for="scanner in scanners"
        :key="scanner._id"
        :class="{
          isActive: isActiveId === scanner._id,
        }"
        @click="selectScanner(scanner._id)"
      >
        <!-- <td>
          <input
            type="checkbox"
            class="checkbox"
            :value="scanner.id"
            :checked="isActiveId === scanner.id"
            v-model="checkbox"
          />
        </td> -->
        <td></td>
        <td>{{ scanner.user }}</td>
        <td>{{ scanner.model }}</td>
        <td>{{ scanner.serialNumber }}</td>
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
const scanners = computed(() => store.getters.getDbData.scanners);
</script>
