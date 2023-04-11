<template>
  <h2>General</h2>
  <div class="segment-wrapper red">
    <router-link to="/replacement" class="card">
      <div class="icon-container">
        <Devices class="card-icon" />
      </div>
      <p class="statistic">{{ data.extensions }}</p>
      <p class="category">Extensions</p>
    </router-link>
    <router-link to="/" class="card">
      <div class="icon-container">
        <Devices class="card-icon" />
      </div>
      <p class="statistic">{{ data.directLines }}</p>
      <p class="category">Direct Lines</p>
    </router-link>
    <router-link to="/" class="card">
      <div class="icon-container">
        <Devices class="card-icon" />
      </div>
      <p class="statistic">{{ data.emails }}</p>
      <p class="category">Emails</p>
    </router-link>
  </div>
</template>

<script setup>
import Devices from "vue-material-design-icons/Devices.vue";

import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

//TODO fix general icons

const data = computed(() => store.getters.getDashboardData);
</script>
