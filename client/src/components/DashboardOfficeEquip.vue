<template>
  <h2>Office Equipment</h2>
  <div class="segment-wrapper blue">
    <router-link to="/office-equipment/printers" class="card">
      <div class="icon-container">
        <Printer class="card-icon" />
      </div>
      <p class="statistic">{{ data.multiPurposePrinters }}</p>
      <p class="category">All-in-one Printers</p>
    </router-link>
    <router-link to="/office-equipment/printers" class="card">
      <div class="icon-container">
        <Printer class="card-icon" />
      </div>
      <p class="statistic">{{ data.generalPrinters }}</p>
      <p class="category">General Printers</p>
    </router-link>

    <router-link to="/office-equipment/scanners" class="card">
      <div class="icon-container">
        <Scanner class="card-icon" />
      </div>
      <p class="statistic">{{ data.scanners }}</p>
      <p class="category">Scanners</p>
    </router-link>
  </div>
  <!-- <router-view /> -->
</template>

<script setup>
import Printer from "vue-material-design-icons/Printer.vue";
import Scanner from "vue-material-design-icons/Scanner.vue";

import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const data = computed(() => store.getters.getRouteData);
</script>
