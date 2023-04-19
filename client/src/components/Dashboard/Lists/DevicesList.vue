<template>
  <Loader v-if="isLoading" />
  <section v-else>
    <div class="config-view-container">
      <div v-if="routeType === 'faulty'" class="config-view-content">
        <router-link
          to="/dashboard/faulty/devices/servers"
          class="config-list-item"
        >
          <Email />
          <div class="info-wrapper">
            <p class="info-head">Servers</p>
            <p class="info-text">{{ data.servers.length }}</p>
          </div>
        </router-link>
        <router-link
          to="/dashboard/faulty/devices/desktops"
          class="config-list-item"
        >
          <Email />
          <div class="info-wrapper">
            <p class="info-head">Desktops</p>
            <p class="info-text">{{ data.desktops.length }}</p>
          </div>
        </router-link>
        <router-link
          to="/dashboard/faulty/devices/laptops"
          class="config-list-item"
        >
          <Email />
          <div class="info-wrapper">
            <p class="info-head">Laptops</p>
            <p class="info-text">{{ data.laptops.length }}</p>
          </div>
        </router-link>
        <router-link
          to="/dashboard/faulty/devices/ups"
          class="config-list-item"
        >
          <Email />
          <div class="info-wrapper">
            <p class="info-head">UPS</p>
            <p class="info-text">{{ data.upSuppliers.length }}</p>
          </div>
        </router-link>
        <router-link
          to="/dashboard/faulty/devices/tablets"
          class="config-list-item"
        >
          <Email />
          <div class="info-wrapper">
            <p class="info-head">Tablets</p>
            <p class="info-text">{{ data.tablets.length }}</p>
          </div>
        </router-link>
        <router-link
          to="/dashboard/faulty/devices/cellphones"
          class="config-list-item"
        >
          <Email />
          <div class="info-wrapper">
            <p class="info-head">Cellphones</p>
            <p class="info-text">{{ data.cellphones.length }}</p>
          </div>
        </router-link>
      </div>
      <div v-else class="config-view-content">
        <router-link
          to="/dashboard/decommissioned/devices/servers"
          class="config-list-item"
        >
          <Email />
          <div class="info-wrapper">
            <p class="info-head">Servers</p>
            <p class="info-text">{{ data.servers.length }}</p>
          </div>
        </router-link>
        <router-link
          to="/dashboard/decommissioned/devices/desktops"
          class="config-list-item"
        >
          <Email />
          <div class="info-wrapper">
            <p class="info-head">Desktops</p>
            <p class="info-text">{{ data.desktops.length }}</p>
          </div>
        </router-link>
        <router-link
          to="/dashboard/decommissioned/devices/laptops"
          class="config-list-item"
        >
          <Email />
          <div class="info-wrapper">
            <p class="info-head">Laptops</p>
            <p class="info-text">{{ data.laptops.length }}</p>
          </div>
        </router-link>
        <router-link
          to="/dashboard/decommissioned/devices/ups"
          class="config-list-item"
        >
          <Email />
          <div class="info-wrapper">
            <p class="info-head">UPS</p>
            <p class="info-text">{{ data.upSuppliers.length }}</p>
          </div>
        </router-link>
        <router-link
          to="/dashboard/decommissioned/devices/tablets"
          class="config-list-item"
        >
          <Email />
          <div class="info-wrapper">
            <p class="info-head">Tablets</p>
            <p class="info-text">{{ data.tablets.length }}</p>
          </div>
        </router-link>
        <router-link
          to="/dashboard/decommissioned/devices/cellphones"
          class="config-list-item"
        >
          <Email />
          <div class="info-wrapper">
            <p class="info-head">Cellphones</p>
            <p class="info-text">{{ data.cellphones.length }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import Loader from "@/components/Loader";
import Email from "vue-material-design-icons/EmailOutline.vue";

import { useStore } from "vuex";
import { computed } from "vue";
import { useRoute } from "vue-router";

import useFetchData from "@/composables/useFetchData";

const store = useStore();
const currentRoute = computed(() => useRoute().name.toLowerCase());

const { isLoading, fetchData } = useFetchData();

const routeType = currentRoute.value.split("-")[0];

fetchData(`/torsk/${routeType}/devices`, false);

const data = computed(() => store.getters.getDbData);
</script>
