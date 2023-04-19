<template>
  <Loader v-if="isLoading" />
  <section v-else>
    <div class="config-view-container">
      <div v-if="routeType === 'faulty'" class="config-view-content">
        <router-link
          to="/dashboard/faulty/networking/routers"
          class="config-list-item"
        >
          <Email />
          <div class="info-wrapper">
            <p class="info-head">Routers</p>
            <p class="info-text">{{ data.routers.length }}</p>
          </div>
        </router-link>
        <router-link
          to="/dashboard/faulty/networking/switches"
          class="config-list-item"
        >
          <Email />
          <div class="info-wrapper">
            <p class="info-head">Switches</p>
            <p class="info-text">{{ data.switches.length }}</p>
          </div>
        </router-link>
        <router-link
          to="/dashboard/faulty/networking/converters"
          class="config-list-item"
        >
          <Email />
          <div class="info-wrapper">
            <p class="info-head">Converters</p>
            <p class="info-text">{{ data.converters.length }}</p>
          </div>
        </router-link>
      </div>
      <div v-else class="config-view-content">
        <router-link
          to="/dashboard/faulty/networking/routers"
          class="config-list-item"
        >
          <Email />
          <div class="info-wrapper">
            <p class="info-head">Routers</p>
            <p class="info-text">{{ data.routers.length }}</p>
          </div>
        </router-link>
        <router-link
          to="/dashboard/faulty/networking/switches"
          class="config-list-item"
        >
          <Email />
          <div class="info-wrapper">
            <p class="info-head">Switches</p>
            <p class="info-text">{{ data.switches.length }}</p>
          </div>
        </router-link>
        <router-link
          to="/dashboard/faulty/networking/converters"
          class="config-list-item"
        >
          <Email />
          <div class="info-wrapper">
            <p class="info-head">Converters</p>
            <p class="info-text">{{ data.converters.length }}</p>
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

import useFetchData from "@/composables/useFetchData";

const store = useStore();

const { isLoading, fetchData } = useFetchData();

fetchData("/torsk/faulty/networking", false);

const data = computed(() => store.getters.getDbData);
</script>
