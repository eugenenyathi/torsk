<template>
  <section class="position-container">
    <div class="add-entry-container">
      <div class="add-entry-content">
        <Transition name="fade">
          <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
        </Transition>
        <form @submit.prevent="handleSubmit()">
          <div class="entry-control cpu">
            <label for="">Incoming mail server</label>
            <div class="inner-control">
              <input
                type="text"
                class="entry-input"
                v-model="collection.incomingMail"
              />
              <div class="grand-child-control">
                <span class="cool-span">Port</span>
                <input
                  type="number"
                  class="entry-input"
                  placeholder="8"
                  v-model="collection.incomingMailPort"
                />
              </div>
            </div>
          </div>
          <div class="entry-control cpu">
            <label for="">Outgoing mail server</label>
            <div class="inner-control">
              <input
                type="text"
                class="entry-input"
                v-model="collection.outgoingMail"
              />
              <div class="grand-child-control">
                <span class="cool-span">Port</span>
                <input
                  type="number"
                  class="entry-input"
                  placeholder="8"
                  v-model="collection.outgoingMailPort"
                />
              </div>
            </div>
          </div>

          <button v-if="!isLoading" class="add-btn" :disabled="isLoading">
            Update
          </button>
          <button v-else class="add-btn" :disabled="isLoading">
            Update
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

import { reactive, computed, watch } from "vue";
import { useStore } from "vuex";

import usePushData from "@/composables/usePushData";

const emit = defineEmits(["openFilterList", "reload"]);
const store = useStore();

const data = computed(() => store.getters.getDbData);
const formData = computed(() => store.getters.getTransitFormData);

const collection = reactive({
  incomingMail: formData.value.incomingMail || data.value.incomingMail,
  incomingMailPort:
    formData.value.incomingMailPort || data.value.incomingMailPort,
  outgoingMail: formData.value.outgoingMail || data.value.outgoingMail,
  outgoingMailPort:
    formData.value.outgoingMailPort || data.value.outgoingMailPort,
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
  if (!collection.incomingMail || collection.incomingMail.length < 3) {
    showAlert(true, "Please provide a valid incoming mail server", "danger");
    removeAlert();
  } else if (!collection.incomingMailPort) {
    showAlert(
      true,
      "Please provide a valid incoming mail server port",
      "danger"
    );
    removeAlert();
  } else if (!collection.outgoingMail || collection.outgoingMail.length < 3) {
    showAlert(true, "Please provide a valid outgoing mail server", "danger");
    removeAlert();
  } else if (!collection.outgoingMailPort) {
    showAlert(
      true,
      "Please provide a valid outgoing mail server port",
      "danger"
    );
    removeAlert();
  } else if (collection.incomingMailPort === collection.outgoingMailPort) {
    showAlert(true, "The mail server ports can not be the same", "danger");
    removeAlert();
  } else {
    store.dispatch("setFlushMessageContext", "configurations");
    store.dispatch("setTransitFormData", {
      incomingMail: collection.incomingMail,
      incomingMailPort: collection.incomingMailPort,
      outgoingMail: collection.outgoingMail,
      outgoingMailPort: collection.outgoingMailPort,
    });

    await putData(`/torsk/config/email/${data.value._id}`, "/emails/config");
  }
};
</script>
