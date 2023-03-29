<template>
  <section class="update-container action-info">
    <div class="update-content">
      <Transition name="switch" mode="out-in">
        <form v-if="page === 1" @submit.prevent="layerOne()">
          <div class="update-control">
            <BaseInput
              class="update-input"
              label="User"
              v-model="model"
              :value="data.user"
            />
          </div>

          <div class="update-control">
            <BaseInput
              class="update-input"
              label="Machine"
              v-model="model"
              :value="data.machine"
            />
          </div>
          <div class="update-control">
            <label for="">Model</label>
            <input type="text" class="update-input" :value="data.model" />
          </div>
          <div class="update-control">
            <BaseInput
              class="update-input"
              label="CPU"
              v-model="model"
              :value="data.cpu"
            />
          </div>

          <button class="update-btn" :disabled="isLoading">Continue</button>
        </form>
        <form v-else-if="page === 2" @submit.prevent="layerTwo()">
          <div class="update-control">
            <BaseInput
              class="update-input"
              label="RAM"
              v-model="model"
              :value="data.ram"
            />
          </div>
          <div class="update-control">
            <BaseInput
              class="update-input"
              v-model="model"
              label="Storage"
              :value="data.storage"
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
              label="Ms Office"
              v-model="model"
              :value="data.office"
            />
          </div>
          <button class="update-btn" :disabled="isLoading">continue</button>
          <div class="go-back" @click="pop(1)">
            <ChevronRight />
            <span>Back</span>
          </div>
        </form>
        <form v-else @submit.prevent="handleSubmit">
          <div class="update-control">
            <BaseInput
              class="update-input"
              v-model="model"
              label="MAC Address"
              :value="data.macAddress"
            />
          </div>
          <div class="update-control">
            <BaseInput
              class="update-input"
              v-model="model"
              label="Desktop Serial number"
              :value="data.serialNumber"
            />
          </div>
          <div class="update-control">
            <BaseInput
              class="update-input"
              v-model="model"
              label="Monitor Serial number"
              :value="data.monitorSerialNumber"
            />
          </div>
          <button class="update-btn" :disabled="isLoading">update</button>
          <div class="go-back" @click="pop(2)">
            <ChevronRight />
            <span>Back</span>
          </div>
        </form>
      </Transition>
    </div>
  </section>
</template>

<script setup>
import ChevronRight from "vue-material-design-icons/ChevronRight.vue";
import BaseInput from "../../../base/BaseInput.vue";

import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const page = ref(1);

const layerOne = () => {
  page.value = 2;
};

const layerTwo = () => {
  page.value = 3;
};

const pop = (targetPage) => {
  page.value = targetPage;
};
const data = computed(() => store.getters.getTransitData);
</script>
