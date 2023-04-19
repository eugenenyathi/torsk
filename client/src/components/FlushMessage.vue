<template>
  <div class="flush-message-container">
    <div class="flush-message-content">
      <h2 v-if="showFlushMessage.context === 'configurations'">
        {{ showFlushMessage.context }} have been
        {{ showFlushMessage.action }} successfully.
      </h2>

      <h2 v-else-if="showFlushMessage.action === 'faulty' && !data.faulty">
        {{ showFlushMessage.context }} has been added as
        {{ showFlushMessage.action }} successfully.
      </h2>
      <h2 v-else-if="showFlushMessage.action === 'faulty' && data.faulty">
        {{ showFlushMessage.context }} has been removed as
        {{ showFlushMessage.action }} successfully.
      </h2>

      <h2
        v-else-if="
          showFlushMessage.action === 'decommission' && !data.decommission
        "
      >
        {{ showFlushMessage.context }} has been
        {{ showFlushMessage.action }} successfully.
      </h2>
      <h2
        v-else-if="
          showFlushMessage.action === 'decommission' && data.decommission
        "
      >
        {{ showFlushMessage.context }} has been re-commissioned successfully.
      </h2>

      <h2 v-else>
        {{ showFlushMessage.context }} has been
        {{ showFlushMessage.action }} successfully.
      </h2>
    </div>
  </div>
</template>

<script setup>
import store from "@/store";
import { ref, computed } from "vue";
import { useStore } from "vuex";

const data = computed(() => store.getters.getTransitData);
const showFlushMessage = computed(() => store.getters.showFlushMessage);
</script>
