<template>
  <section v-if="action === 'update'" class="update-container action-info">
    <div class="update-content">
      <form @submit.prevent="handleSubmit()">
        <div class="update-control">
          <label for="">Model</label>
          <input type="text" class="update-input" />
        </div>
        <div class="update-control">
          <label for="">Location</label>
          <input type="text" class="update-input" :value="data.location" />
        </div>
        <div class="update-control">
          <label for="">Ports</label>
          <input type="number" class="update-input" :value="data.ports" />
        </div>
        <div class="update-control">
          <label for="">Dead ports</label>
          <input type="number" class="update-input" :value="data.deadports" />
        </div>

        <button class="update-btn" :disabled="isLoading">update</button>
      </form>
    </div>
  </section>
  <State v-else :action="action" :context="context" />
</template>

<script setup>
import State from "./ActionState";

import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  action: String,
  context: String,
});

const store = useStore();
const data = computed(() => store.getters.getTransitData);

const collection = reactive({ wireless: false });
</script>
