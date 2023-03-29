<template>
  <section class="update-container action-info">
    <div class="update-content">
      <Transition name="switch" mode="out-in">
        <form v-if="page === 1" @submit.prevent="subSubmit()">
          <div class="update-control">
            <label for="">User</label>
            <input type="text" class="update-input" :value="data.user" />
          </div>
          <div class="update-control">
            <label for="">Model</label>
            <input type="text" class="update-input" :value="data.model" />
          </div>
          <div class="update-control">
            <label for="">OS</label>
            <input type="text" class="update-input" :value="data.os" />
          </div>
          <div class="update-control">
            <label for="">Storage</label>
            <div class="storage-input-wrapper">
              <input type="text" class="update-input" :value="data.storage" />
              <span class="cool-span">GB</span>
            </div>
          </div>

          <button class="update-btn" :disabled="isLoading">continue</button>
        </form>
        <form v-else @submit.prevent="handleSubmit()">
          <div class="update-control">
            <label for="">MAC Address</label>
            <input type="text" class="update-input" :value="data.macAddress" />
          </div>
          <div class="update-control">
            <label for="">Serial Number</label>
            <input
              type="text"
              class="update-input"
              :value="data.serialNumber"
            />
          </div>
          <div class="update-control">
            <label for="">IMEI Number</label>
            <input type="text" class="update-input" :value="data.imei" />
          </div>

          <button class="update-btn" :disabled="isLoading">update</button>
          <div class="go-back" @click="pop">
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
import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const data = computed(() => store.getters.getTransitData);

const page = ref(1);

const subSubmit = () => {
  page.value = 2;
};

const pop = () => {
  page.value = 1;
};
</script>
