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

import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import axios from "axios";

const store = useStore();
const router = useRouter();

const isLoading = ref(false);
const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const collection = reactive({
  location: "Server-room",
  model: "trendnet",
  serialNumber: "11354-2689",
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
    try {
      isLoading.value = true;

      const res = await axios.post("/torsk/networking/converter", {
        location: collection.location,
        model: collection.model,
        serialNumber: collection.serialNumber,
      });

      isLoading.value = false;

      store.dispatch("setShowFlushMessage", {
        state: true,
        action: "added",
        context: `${collection.location} converter`,
      });

      setTimeout(() => {
        store.dispatch("setShowFlushMessage", { state: false });
        router.push("/networking/converters");
      }, 3000);
    } catch (err) {
      isLoading.value = false;
      console.log(err);
      showAlert(true, err.response.data.err, "danger");
      removeAlert();
    }
  }
};
</script>
