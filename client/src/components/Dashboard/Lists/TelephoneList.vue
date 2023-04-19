<template>
  <Loader v-if="isLoading" />
  <section v-else>
    <div class="config-view-container">
      <div v-if="routeType === 'faulty'" class="config-view-content">
        <router-link
          to="/dashboard/faulty/telephones/"
          class="config-list-item"
        >
          <Email />
          <div class="info-wrapper">
            <p class="info-head">Extensions</p>
            <!-- <p class="info-text">{{ data.telephones.length }}</p> -->
          </div>
        </router-link>
        <router-link
          to="/dashboard/faulty/telephones/"
          class="config-list-item"
        >
          <Email />
          <div class="info-wrapper">
            <p class="info-head">Direct Lines</p>
            <!-- <p class="info-text">{{ data.telephones.length }}</p> -->
          </div>
        </router-link>
      </div>
      <div v-else class="config-view-content">
        <router-link
          to="/dashboard/faulty/telephones/"
          class="config-list-item"
        >
          <Email />
          <div class="info-wrapper">
            <p class="info-head">Extensions</p>
            <!-- <p class="info-text">{{ data.telephones.length }}</p> -->
          </div>
        </router-link>
        <router-link
          to="/dashboard/faulty/telephones/"
          class="config-list-item"
        >
          <Email />
          <div class="info-wrapper">
            <p class="info-head">Direct Lines</p>
            <!-- <p class="info-text">{{ data.telephones.length }}</p> -->
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

fetchData("/torsk/faulty/devices", false);

const data = computed(() => store.getters.getDbData);
</script>
