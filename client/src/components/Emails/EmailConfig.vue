<template>
  <Loader v-if="isLoading" />
  <NoData v-else-if="!isLoading && configData.length === 0" />
  <section v-else>
    <div class="config-view-container">
      <div class="config-view-content">
        <div class="config-list-item">
          <IncomingEmail />
          <div class="info-wrapper">
            <p class="info-head">Incoming mail server</p>
            <p class="info-text">
              {{ configData.incomingMail }}
              <span class="cool-span">
                Port {{ configData.incomingMailPort }}
              </span>
            </p>
          </div>
        </div>
        <div class="config-list-item">
          <OutgoingEmail />
          <div class="info-wrapper">
            <p class="info-head">Outgoing mail server</p>
            <p class="info-text">
              {{ configData.outgoingMail }}
              <span class="cool-span">
                Port {{ configData.outgoingMailPort }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import IncomingEmail from "vue-material-design-icons/EmailArrowLeftOutline.vue";
import OutgoingEmail from "vue-material-design-icons/EmailArrowRightOutline.vue";

import Loader from "@/components/Loader";
import NoData from "@/components/NoData";

import { useStore } from "vuex";
import { computed } from "vue";

import useFetchData from "@/composables/useFetchData";

const store = useStore();

const { isLoading, fetchConfig } = useFetchData();

fetchConfig("/torsk/config/email");

const configData = computed(() => store.getters.getDbData);
</script>
