<template>
  <h2>Devices</h2>
  <div class="segment-wrapper green">
    <router-link to="/devices/servers" class="card">
      <div class="icon-container">
        <Devices class="card-icon" />
      </div>
      <p class="statistic">{{ data.servers }}</p>
      <p class="category">Servers</p>
    </router-link>
    <router-link to="/devices/desktops" class="card">
      <div class="icon-container">
        <Devices class="card-icon" />
      </div>
      <p class="statistic">{{ data.desktops }}</p>
      <p class="category">Desktops</p>
    </router-link>
    <router-link to="/devices/laptops" class="card">
      <div class="icon-container">
        <Laptop class="card-icon" />
      </div>
      <p class="statistic">{{ data.laptops }}</p>
      <p class="category">Laptops</p>
    </router-link>
    <router-link to="/devices/tablets" class="card">
      <div class="icon-container">
        <Tablet class="card-icon" />
      </div>
      <p class="statistic">{{ data.tablets }}</p>
      <p class="category">Tablets</p>
    </router-link>
    <router-link to="/devices/cellphones" class="card">
      <div class="icon-container">
        <Cellphone class="card-icon" />
      </div>
      <p class="statistic">{{ data.cellphones }}</p>
      <p class="category">Cellphones</p>
    </router-link>
  </div>
</template>

<script setup>
//icons
import Devices from "vue-material-design-icons/Monitor.vue";
import Laptop from "vue-material-design-icons/Laptop.vue";
import Tablet from "vue-material-design-icons/Tablet.vue";
import Cellphone from "vue-material-design-icons/Cellphone.vue";

import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const data = computed(() => store.getters.getDbData);
</script>
