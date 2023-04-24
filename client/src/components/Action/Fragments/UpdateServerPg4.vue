<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <Transition name="fade">
        <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
      </Transition>
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
        <label for="">Monitor Serial Number</label>
        <input
          type="text"
          class="update-input"
          v-model="collection.monitorSerialNumber"
        />
      </div>

      <button v-if="!isLoading" class="update-btn" :disabled="isLoading">
        update
      </button>
      <button v-else class="update-btn" :disabled="isLoading">
        update
        <Loader />
      </button>

      <div class="go-back" @click="$emit('pop', 3)">
        <ChevronRight />
        <span>Back</span>
      </div>
    </form>
  </div>
</template>

<script setup>
import ChevronRight from "vue-material-design-icons/ChevronRight.vue";

import Loader from "@/components/BrownishBtnLoader";
import Alert from "@/components/Alert.vue";
import AlertFn from "@/helpers/AlertFn.js";
import mac from "mac-regex";

import usePushData from "@/composables/usePushData";

import { useStore } from "vuex";
import { ref, computed, reactive } from "vue";

const store = useStore();
const emit = defineEmits(["pop"]);

const data = computed(() => store.getters.getTransitData);
const formData = computed(() => store.getters.getTransitFormData);

const collection = reactive({
  macAddress: formData.value.macAddress || data.value.macAddress,
  serialNumber: formData.value.serialNumber || data.value.serialNumber,
  monitorSerialNumber:
    formData.value.monitorSerialNumber || data.value.monitorSerialNumber,
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
    showAlert(true, "Please enter a valid desktop serial number", "danger");
    removeAlert();
  } else if (
    collection.monitorSerialNumber &&
    collection.monitorSerialNumber.length < 6
  ) {
    showAlert(true, "Please enter a valid monitor serial number", "danger");
    removeAlert();
  } else {
    store.dispatch("setFlushMessageContext", `${data.value.machine} `);
    store.dispatch("setTransitFormData", {
      macAddress: collection.macAddress,
      serialNumber: collection.serialNumber,
      monitorSerialNumber: collection.monitorSerialNumber,
    });

    await putData(`/torsk/devices/server/${data.value._id}`);
  }
};
</script>
