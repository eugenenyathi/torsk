<template>
  <section v-if="action === 'update'" class="update-container action-info">
    <form class="update-content" @submit.prevent="handleSubmit">
      <Transition name="fade">
        <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
      </Transition>
      <div class="update-control">
        <label for="">Location</label>
        <input type="text" class="update-input" v-model="collection.location" />
      </div>
      <div class="update-control">
        <label for="">Model</label>
        <input type="text" class="update-input" v-model="collection.model" />
      </div>
      <div class="update-control">
        <label for="">Serial Number</label>
        <input
          type="text"
          class="update-input"
          v-model="collection.serialNumber"
        />
      </div>

      <button v-if="!isLoading" class="update-btn" :disabled="isLoading">
        update
      </button>
      <button v-else class="update-btn" :disabled="isLoading">
        update
        <Loader />
      </button>
    </form>
  </section>
  <State v-else :action="action" :context="context" />
</template>

<script setup>
import State from "./ActionState";
import Loader from "../BtnLoader";
import Alert from "../Alert.vue";
import AlertFn from "../../helpers/AlertFn.js";

import usePushData from "@/composables/usePushData";

import { ref, reactive, computed, watch } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  action: String,
  context: String,
});

const store = useStore();
const data = computed(() => store.getters.getTransitData);

const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const collection = reactive({
  deviceId: data.value._id,
  location: data.value.location,
  model: data.value.model,
  serialNumber: data.value.serialNumber,
});

const { isLoading, axiosError, putData } = usePushData();

watch(axiosError, (currentValue, oldValue) => {
  if (currentValue) {
    showAlert(true, currentValue, "danger");
    removeAlert();
  }

  axiosError.value = null;
});

const handleSubmit = async () => {
  if (!collection.location || collection.location.length < 2) {
    showAlert(true, "Please enter a valid location", "danger");
    removeAlert();
  } else if (!collection.model || collection.model.length < 2) {
    showAlert(true, "Please enter a valid model", "danger");
    removeAlert();
  } else if (!collection.serialNumber || collection.serialNumber.length < 6) {
    showAlert(true, "Please enter a valid serial number", "danger");
    removeAlert();
  } else {
    store.dispatch(
      "setFlushMessageContext",
      `${collection.location} converter`
    );
    store.dispatch("setTransitFormData", {
      location: collection.location,
      model: collection.model,
      serialNumber: collection.serialNumber,
    });

    await putData(`/torsk/networking/converters/${collection.deviceId}`);
  }
};
</script>
