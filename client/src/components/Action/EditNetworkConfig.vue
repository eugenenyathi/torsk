<template>
  <section class="position-container">
    <div class="add-entry-container">
      <div class="add-entry-content">
        <Transition name="fade">
          <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
        </Transition>
        <form @submit.prevent="handleSubmit()">
          <div class="entry-control">
            <label for="">Base ip address</label>
            <input
              type="text"
              class="entry-input"
              v-model="collection.baseIpAddress"
            />
          </div>
          <div class="entry-control">
            <label for="">Default gateway</label>
            <input
              type="text"
              class="entry-input"
              v-model="collection.defaultGateway"
            />
          </div>
          <div class="entry-control">
            <label for="">DNS</label>
            <input type="text" class="entry-input" v-model="collection.dns" />
          </div>

          <button v-if="!isLoading" class="add-btn" :disabled="isLoading">
            update
          </button>
          <button v-else class="add-btn" :disabled="isLoading">
            update
            <Loader />
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import Loader from "@/components/BtnLoader";
import Alert from "@/components/Alert.vue";
import AlertFn from "@/helpers/AlertFn.js";
import ipValidator from "@/helpers/ipValidator.js";

import { reactive, computed, watch } from "vue";
import { useStore } from "vuex";
import usePushData from "@/composables/usePushData";

const emit = defineEmits(["openFilterList", "reload"]);
const store = useStore();

const data = computed(() => store.getters.getDbData);
const formData = computed(() => store.getters.getTransitFormData);

const collection = reactive({
  baseIpAddress: formData.value.baseIpAddress || data.value.baseIpAddress,
  defaultGateway: formData.value.defaultGateway || data.value.defaultGateway,
  dns: formData.value.dns || data.value.dns,
});

const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const { isLoading, axiosError, putData } = usePushData();

watch(axiosError, (currentValue, oldValue) => {
  if (currentValue) {
    showAlert(true, currentValue, "danger");
    removeAlert();
  }

  axiosError.value = null;
});

const handleSubmit = async () => {
  if (!collection.baseIpAddress || !ipValidator(collection.baseIpAddress)) {
    showAlert(true, "Please enter a valid base ip address", "danger");
    removeAlert();
  } else if (
    !collection.defaultGateway ||
    !ipValidator(collection.defaultGateway)
  ) {
    showAlert(true, "Please enter a valid default gateway address", "danger");
    removeAlert();
  } else if (!collection.dns || !ipValidator(collection.dns)) {
    showAlert(true, "Please enter a valid base dns address", "danger");
    removeAlert();
  } else {
    store.dispatch("setFlushMessageContext", "configurations");
    store.dispatch("setTransitFormData", {
      baseIpAddress: collection.baseIpAddress,
      defaultGateway: collection.defaultGateway,
      dns: collection.dns,
    });

    await putData(
      `/torsk/config/network/${data.value._id}`,
      "/networking/config"
    );
  }
};
</script>
