<template>
  <section class="position-container">
    <div class="add-entry-container">
      <div class="add-entry-content">
        <Transition name="switch" mode="out-in">
          <div>
            <h2>Add a new ups</h2>
            <Transition name="fade">
              <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
            </Transition>
            <form @submit.prevent="handleSubmit()">
              <div class="entry-control">
                <label for="">Connected Device</label>
                <input
                  type="text"
                  class="entry-input"
                  placeholder="e.g. Promun server"
                  v-model="collection.connectedDevice"
                />
              </div>
              <div class="entry-control">
                <label for="">Model</label>
                <input
                  type="text"
                  class="entry-input"
                  placeholder="e.g. APC 200"
                  v-model="collection.model"
                />
              </div>
              <div class="entry-control">
                <label for="">Watts</label>
                <input
                  type="number"
                  class="entry-input"
                  v-model="collection.watts"
                />
              </div>
              <div class="entry-control">
                <label for="">Serial Number</label>
                <input
                  type="text"
                  class="entry-input"
                  v-model="collection.serialNumber"
                />
              </div>
              <button v-if="!isLoading" class="add-btn" :disabled="isLoading">
                add
              </button>
              <button v-else class="add-btn" :disabled="isLoading">
                add
                <Loader />
              </button>
            </form>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>

<script setup>
import Loader from "@/components/BtnLoader";
import Alert from "@/components/Alert.vue";
import AlertFn from "@/helpers/AlertFn.js";
import usePushData from "@/composables/usePushData";

import { ref, reactive, computed, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();

const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const data = computed(() => store.getters.getTransitFormData);

const collection = reactive({
  connectedDevice: data.value.connectedDevice || "PromunServer",
  model: data.value.model || "APC Server",
  watts: data.value.watts || 60,
  serialNumber: data.value.serialNumber || "11354-5689",
});

const { isLoading, axiosError, postData } = usePushData();

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

    await postData("/devices/ups", "/torsk/devices/ups");
  }
};
</script>
