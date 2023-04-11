<template>
  <section class="position-container">
    <div class="add-entry-container">
      <div class="add-entry-content">
        <h2>Edit address</h2>
        <form @submit.prevent="handleSubmit()">
          <div class="entry-control">
            <label for="">User</label>
            <span class="immutable-data">{{ data.user }}</span>
          </div>
          <div class="entry-control">
            <label for="">Remote Address</label>
            <input type="number" class="entry-input" v-model="address" />
          </div>

          <Transition name="fade">
            <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
          </Transition>

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
import Loader from "../BtnLoader";
import Alert from "../Alert.vue";
import AlertFn from "../../helpers/AlertFn.js";

import usePushData from "@/composables/usePushData";

import { ref, reactive, computed, watch } from "vue";
import { useStore } from "vuex";

const data = computed(() => store.getters.getTransitData);

const store = useStore();

const address = ref(data.value.address);

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
  if (!address.value) {
    showAlert(true, "The address field is empty", "danger");
    removeAlert();
  } else {
    store.dispatch(
      "setFlushMessageContext",
      `${data.value.user} remote address`
    );
    store.dispatch("setTransitFormData", {
      address: address.value,
    });

    await putData(`/torsk/remote_desktop/${data.value._id}`, "/remote");
  }
};
</script>
