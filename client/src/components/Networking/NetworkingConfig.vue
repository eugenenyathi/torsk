<template>
  <Loader v-if="isLoading" />
  <NoData v-else-if="!isLoading && configData.length === 0" />
  <section v-else>
    <div class="config-view-container">
      <div class="config-view-content">
        <div class="config-list-item">
          <IpAddress />
          <div class="info-wrapper">
            <p class="info-head">Base ip address</p>
            <p class="info-text">
              {{ configData.baseIpAddress }}
            </p>
          </div>
        </div>
        <div class="config-list-item">
          <Gate />
          <div class="info-wrapper">
            <p class="info-head">Default gateway</p>
            <p class="info-text">
              {{ configData.defaultGateway }}
            </p>
          </div>
        </div>
        <div class="config-list-item">
          <Web />
          <div class="info-wrapper">
            <p class="info-head">DNS</p>
            <p class="info-text">
              {{ configData.dns }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Email from "vue-material-design-icons/EmailOutline.vue";
import IpAddress from "vue-material-design-icons/IpOutline.vue";
import Gate from "vue-material-design-icons/Gate.vue";
import Web from "vue-material-design-icons/Web.vue";

import Loader from "@/components/Loader";
import NoData from "@/components/NoData";

import { useStore } from "vuex";
import { computed } from "vue";

import useFetchData from "@/composables/useFetchData";

const store = useStore();

const { isLoading, fetchConfig } = useFetchData();

fetchConfig("/torsk/config/network");

const configData = computed(() => store.getters.getDbData);
</script>
