<template>
  <div class="flush-message-container">
    <div class="flush-message-content">
      <h2>
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

const showFlushMessage = computed(() => store.getters.showFlushMessage);
</script>
