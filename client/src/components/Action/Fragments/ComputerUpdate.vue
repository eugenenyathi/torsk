<template>
  <section class="update-container action-info">
    <form v-if="page === 1" class="update-content" @submit.prevent="next">
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
          label="Computer Name"
          v-model="model"
          :value="data.name"
        />
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
          label="CPU"
          v-model="model"
          value="Dual Core Intel Celeron B800"
        />
      </div>
      <div class="update-control">
        <BaseInput
          class="update-input"
          label="RAM"
          v-model="model"
          :value="data.ram"
        />
      </div>

      <button class="update-btn" :disabled="isLoading">next</button>
    </form>
    <form v-else class="update-content" @submit.prevent="handleSubmit">
      <div class="update-control">
        <BaseInput
          class="update-input"
          v-model="model"
          label="Storage"
          value="HDD 450GB"
        />
      </div>
      <div class="update-control">
        <BaseInput
          class="update-input"
          label="Ms Office"
          v-model="model"
          :value="data.msoffice"
        />
      </div>
      <div class="update-control">
        <BaseInput
          class="update-input"
          v-model="model"
          label="MAC Address"
          value="40-60-A3-77-89"
        />
      </div>
      <div class="update-control">
        <BaseInput
          class="update-input"
          v-model="model"
          label="Desktop Serial number"
          value="40-60-A3-77-89"
        />
      </div>
      <div class="update-control">
        <BaseInput
          class="update-input"
          v-model="model"
          label="Monitor Serial number"
          value="40-60-A3-77-89"
        />
      </div>
      <button class="update-btn" :disabled="isLoading">update</button>
      <div class="go-back">
        <ChevronRight />
        <span @click="pop">Back</span>
      </div>
    </form>
  </section>
</template>

<script setup>
import ChevronRight from "vue-material-design-icons/ChevronRight.vue";
import BaseInput from "../../../base/BaseInput.vue";

import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const page = ref(1);

const next = () => {
  page.value = 2;
};

const pop = () => {
  page.value = 1;
};
const data = computed(() => store.getters.getTransitData);
</script>
