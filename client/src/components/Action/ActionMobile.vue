<template>
  <section v-if="action === 'specs'" class="specs-container action-info">
    <div class="info">
      <Devices class="icon" />
      <div class="spec">
        <p>Model</p>
        <p>Samsung</p>
      </div>
    </div>
    <div class="info">
      <Devices class="icon" />
      <div class="spec">
        <p>Operating System</p>
        <p>Android 10</p>
      </div>
    </div>
    <div class="info">
      <Devices class="icon" />
      <div class="spec">
        <p>MAC Address</p>
        <p>40-60-A3-77-89</p>
      </div>
    </div>
    <div class="info">
      <Devices class="icon" />
      <div class="spec">
        <p>Serial Number</p>
        <p>RFX-8954</p>
      </div>
    </div>
  </section>
  <section v-else-if="action === 'update'" class="update-container action-info">
    <form class="update-content" @submit.prevent="handleSubmit">
      <div class="update-control">
        <BaseInput
          class="update-input"
          label="User"
          v-model="model"
          :value="data.user"
        />
      </div>
      <div class="update-control">
        <label for="">Model</label>
        <input type="text" class="update-input" value="samsung notebook n300" />
      </div>
      <div class="update-control">
        <BaseInput
          class="update-input"
          label="Operating System"
          v-model="model"
          :value="data.os"
        />
      </div>
      <div class="update-control">
        <BaseInput
          class="update-input"
          label="Storage"
          v-model="model"
          value=""
        />
      </div>
      <div class="update-control">
        <BaseInput
          class="update-input"
          label="MAC Address"
          v-model="model"
          value=""
        />
      </div>

      <div class="update-control">
        <BaseInput
          class="update-input"
          label="Serial Number"
          v-model="model"
          value=""
        />
      </div>

      <button class="update-btn" :disabled="isLoading">update</button>
    </form>
  </section>
  <State v-else :action="action" :context="context" />
</template>

<script setup>
import BaseInput from "../../base/BaseInput.vue";

import State from "./ActionState";

import { reactive, computed } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  action: String,
  context: String,
});

const store = useStore();
const data = computed(() => store.getters.getTransitData);
</script>
