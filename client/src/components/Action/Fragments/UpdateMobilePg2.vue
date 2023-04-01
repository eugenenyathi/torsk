<template>
  <div>
    <Transition name="fade">
      <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
    </Transition>
    <form @submit.prevent="handleSubmit()">
      <div class="update-control">
        <label for="">MAC Address</label>
        <input
          type="text"
          class="update-input"
          v-model="collection.macAddress"
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
      <div class="update-control">
        <label for="">IMEI Number</label>
        <input type="text" class="update-input" v-model="collection.imei" />
      </div>

      <button v-if="!isLoading" class="update-btn" :disabled="isLoading">
        update
      </button>
      <button v-else class="update-btn" :disabled="isLoading">
        update
        <Loader />
      </button>

      <div class="go-back" @click="$emit('pop', 1)">
        <ChevronRight />
        <span>Back</span>
      </div>
    </form>
  </div>
</template>

<script setup>
import ChevronRight from "vue-material-design-icons/ChevronRight.vue";

import Loader from "@/components/BtnLoader";
import Alert from "@/components/Alert.vue";
import AlertFn from "@/helpers/AlertFn.js";

import mac from "mac-regex";

import usePushData from "@/composables/usePushData";

import { useStore } from "vuex";
import { ref, computed, reactive } from "vue";

const store = useStore();
const emit = defineEmits(["next", "pop"]);

const data = computed(() => store.getters.getTransitData);
const formData = computed(() => store.getters.getTransitFormData);

const collection = reactive({
  macAddress: formData.value.macAddress || data.value.macAddress,
  serialNumber: formData.value.macAddress || data.value.serialNumber,
  imei: formData.value.macAddress || data.value.imei,
});

const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const { isLoading, axiosError, putData } = usePushData();

const handleSubmit = async () => {
  if (
    collection.macAddress &&
    !mac({ exact: true }).test(collection.macAddress)
  ) {
    showAlert(true, "Please enter a valid mac address", "danger");
    removeAlert();
  } else if (!collection.serialNumber || collection.serialNumber.length < 3) {
    showAlert(true, "Please enter a valid serial number", "danger");
    removeAlert();
  } else if (!collection.imei || collection.imei.length != 15) {
    showAlert(true, "Please enter a valid imei", "danger");
    removeAlert();
  } else {
    store.dispatch("setTransitFormData", {
      macAddress: collection.macAddress,
      serialNumber: collection.serialNumber,
      imei: collection.imei,
    });

    await putData(
      data.value.deviceType,
      `/torsk/devices/mobile/${data.value._id}`
    );
  }
};
</script>
