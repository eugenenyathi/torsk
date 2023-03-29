<template>
  <section v-if="action === 'update'" class="update-container action-info">
    <form class="update-content" @submit.prevent="handleSubmit">
      <div class="update-control">
        <BaseInput
          :class="{
            'update-input': data.location !== 'it',
            'update-input upper-case': data.location === 'it',
          }"
          label="Router Location"
          v-model="model"
          :value="data.location"
        />
      </div>
      <div class="update-control">
        <label for="">SSID</label>
        <input type="text" class="update-input" :value="data.ssid" />
      </div>

      <div class="update-control">
        <label for="">Password</label>
        <input type="text" class="update-input" />
      </div>

      <button class="update-btn" :disabled="isLoading">update</button>
    </form>
  </section>
  <State v-else :action="action" :context="context" />
</template>

<script setup>
import BaseInput from "../../base/BaseInput.vue";
import State from "./ActionState";

import { ref, computed } from "vue";

import { useStore } from "vuex";

const props = defineProps({
  action: String,
  context: String,
});

const store = useStore();
const data = computed(() => store.getters.getTransitData);
</script>
