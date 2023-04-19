<template>
  <section v-if="action === 'update'" class="update-container action-info">
    <div class="update-content">
      <Transition name="switch" mode="out-in">
        <div>
          <Transition name="fade">
            <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
          </Transition>
          <form @submit.prevent="handleSubmit()">
            <div class="update-control">
              <label for="">Connected Device</label>
              <input
                type="text"
                class="update-input"
                placeholder="e.g. Promun server"
                v-model="collection.connectedDevice"
              />
            </div>
            <div class="update-control">
              <label for="">Model</label>
              <input
                type="text"
                class="update-input"
                placeholder="e.g. APC 200"
                v-model="collection.model"
              />
            </div>
            <div class="update-control">
              <label for="">Watts</label>
              <input
                type="number"
                class="update-input"
                v-model="collection.watts"
              />
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
        </div>
      </Transition>
    </div>
  </section>
  <State v-else :action="action" :context="context" />
</template>

<script setup>
import State from "./ActionState";
import Loader from "@/components/BtnLoader";
import Alert from "@/components/Alert.vue";
import AlertFn from "@/helpers/AlertFn.js";

import usePushData from "@/composables/usePushData";

import { reactive, computed, watch } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  action: String,
  context: String,
});

const store = useStore();

const data = computed(() => store.getters.getTransitData);
const formData = computed(() => store.getters.getTransitFormData);

const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const collection = reactive({
  connectedDevice: formData.value.connectedDevice || data.value.connectedDevice,
  model: formData.value.model || data.value.model,
  watts: formData.value.watts || data.value.watts,
  serialNumber: formData.value.serialNumber || data.value.serialNumber,
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
  if (!collection.connectedDevice || collection.connectedDevice.length < 3) {
    showAlert(true, "Please enter a valid device name", "danger");
    removeAlert();
  } else if (!collection.model || collection.model.length < 2) {
    showAlert(true, "Please enter a valid model", "danger");
    removeAlert();
  } else if (!collection.watts) {
    showAlert(true, "Please enter a valid watt number", "danger");
    removeAlert();
  } else if (!collection.serialNumber || collection.serialNumber.length < 6) {
    showAlert(true, "Please enter a valid serial number", "danger");
    removeAlert();
  } else {
    store.dispatch(
      "setFlushMessageContext",
      `${collection.connectedDevice}'s ups`
    );
    store.dispatch("setTransitFormData", {
      connectedDevice: collection.connectedDevice,
      model: collection.model,
      watts: collection.watts,
      serialNumber: collection.serialNumber,
    });

    await putData(`/torsk/devices/ups/${data.value._id}`);
  }
};
</script>
