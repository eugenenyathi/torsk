<template>
  <div>
    <Transition name="fade">
      <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
    </Transition>
    <form @submit.prevent="handleSubmit()">
      <div class="entry-control">
        <label for="">IP Address</label>
        <input type="text" class="entry-input" v-model="collection.ipAddress" />
      </div>

      <div class="entry-control">
        <label for="">MAC Address</label>
        <input
          type="text"
          class="entry-input"
          v-model="collection.macAddress"
        />
      </div>
      <div class="entry-control">
        <label>Serial Number</label>
        <input
          type="text"
          class="entry-input"
          v-model="collection.serialNumber"
        />
      </div>
      <div class="entry-control">
        <label>Monitor Serial Number</label>
        <input
          type="text"
          class="entry-input"
          placeholder="Optional field"
          v-model="collection.monitorSerialNumber"
        />
      </div>

      <button v-if="!isLoading" class="add-btn" :disabled="isLoading">
        add
      </button>
      <button v-else class="add-btn" :disabled="isLoading">
        add
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

import Loader from "@/components/BtnLoader";
import Alert from "@/components/Alert.vue";
import AlertFn from "@/helpers/AlertFn.js";

import ipValidator from "@/helpers/ipValidator.js";
import mac from "mac-regex";

import usePushData from "@/composables/usePushData";

import { useStore } from "vuex";
import { ref, computed, reactive, watch } from "vue";

const store = useStore();
const emit = defineEmits(["pop"]);

const data = computed(() => store.getters.getTransitFormData);

const collection = reactive({
  ipAddress: data.value.ipAddress || "192.168.1.23",
  macAddress: data.value.macAddress || "b8:03:05:41:89:dd",
  serialNumber: data.value.serialNumber || "123456-8942",
  monitorSerialNumber: data.value.monitorSerialNumber,
});

const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const { isLoading, axiosError, postData } = usePushData();

watch(axiosError, (currentValue, oldValue) => {
  if (currentValue) {
    showAlert(true, currentValue, "danger");
    removeAlert();
  }

  axiosError.value = null;
});

const handleSubmit = async () => {
  if (!collection.ipAddress || !ipValidator(collection.ipAddress)) {
    showAlert(true, "Please enter a valid ip address", "danger");
    removeAlert();
  } else if (
    collection.macAddress &&
    !mac({ exact: true }).test(collection.macAddress)
  ) {
    showAlert(true, "Please enter a valid mac address", "danger");
    removeAlert();
  } else if (!collection.serialNumber || collection.serialNumber.length < 3) {
    showAlert(true, "Please enter a valid serial number", "danger");
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
      ipAddress: collection.ipAddress,
      macAddress: collection.macAddress,
      serialNumber: collection.serialNumber,
      ...(collection.monitorSerialNumber && {
        monitorSerialNumber: collection.monitorSerialNumber,
      }),
    });

    await postData("/devices/servers", "/torsk/devices/server/");
  }
};
</script>
