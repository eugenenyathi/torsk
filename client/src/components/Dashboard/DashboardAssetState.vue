<template>
  <h2>Asset States</h2>
  <div class="segment-wrapper red">
    <router-link to="/dashboard/faulty/devices" class="card">
      <div class="icon-container">
        <Devices class="card-icon" />
      </div>
      <p class="statistic">{{ data.faulty }}</p>
      <p class="category">Faulty</p>
    </router-link>
    <router-link to="/dashboard/decommissioned/devices" class="card">
      <div class="icon-container">
        <Devices class="card-icon" />
      </div>
      <p class="statistic">{{ data.decommissioned }}</p>
      <p class="category">Decommissioned Equip</p>
    </router-link>
    <!-- <router-link to="/dashboard/in-repair/devices" class="card">
      <div class="icon-container">
        <Devices class="card-icon" />
      </div>
      <p class="statistic">0</p>
      <p class="category">In Repair</p>
    </router-link> -->
  </div>
</template>

<script setup>
import Devices from "vue-material-design-icons/Devices.vue";

import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const data = computed(() => store.getters.getDbData);
</script>
