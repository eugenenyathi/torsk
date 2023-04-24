<template>
  <section class="position-container">
    <div class="add-entry-container">
      <div class="add-entry-content">
        <h2>Add a new converter</h2>
        <Transition name="fade">
          <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
        </Transition>
        <form @submit.prevent="handleSubmit()">
          <div class="entry-control">
            <label for="">Location</label>
            <input
              type="text"
              class="entry-input"
              placeholder="e.g. DESKTOP-34562"
              v-model="collection.location"
            />
          </div>
          <div class="entry-control">
            <label for="">Model</label>
            <input
              type="text"
              class="entry-input"
              placeholder="e.g. HP P250"
              v-model="collection.model"
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
    </div>
  </section>
</template>

<script setup>
import Loader from "../../BtnLoader";
import Alert from "../../Alert.vue";
import AlertFn from "../../../helpers/AlertFn.js";
import usePushData from "@/composables/usePushData";

import { ref, reactive, computed, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const data = computed(() => store.getters.getTransitFormData);

const collection = reactive({
  location: data.value.location || "IT server room",
  model: data.value.model || "trendnet",
  serialNumber: data.value.serialNumber || "11354-2689",
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

    await postData("/networking/converters", "/torsk/networking/converters");
  }
};
</script>
