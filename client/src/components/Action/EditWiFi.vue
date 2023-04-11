<template>
  <section class="position-container">
    <div class="add-entry-container">
      <div class="add-entry-content">
        <h2>Edit address</h2>
        <Transition name="fade">
          <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
        </Transition>
        <form @submit.prevent="handleSubmit()">
          <div class="entry-control">
            <label for="">Router Location</label>
            <span class="immutable-data">{{ data.location }}</span>
          </div>

          <div class="entry-control">
            <label for="">SSID</label>
            <input type="text" class="entry-input" v-model="ssid" />
          </div>
          <div class="entry-control">
            <label for="">Password</label>
            <input :type="pwdType" class="entry-input" v-model="password" />
            <button
              v-if="!showPassword"
              type="button"
              class="eye-icon"
              @click="togglePassword"
            >
              <EyeOutline />
            </button>
            <button
              v-else
              type="button"
              class="eye-icon"
              @click="togglePassword"
            >
              <EyeOffOutline />
            </button>
          </div>

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
//icons
import EyeOutline from "vue-material-design-icons/EyeOutline.vue";
import EyeOffOutline from "vue-material-design-icons/EyeOffOutline.vue";

import Loader from "@/components/BtnLoader";
import Alert from "@/components/Alert.vue";
import AlertFn from "@/helpers/AlertFn.js";

import { ref, reactive, computed, watch } from "vue";
import { useStore } from "vuex";

import usePushData from "@/composables/usePushData";

const store = useStore();

const data = computed(() => store.getters.getTransitData);

const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const ssid = ref(data.value.ssid);
const password = ref(data.value.password);

const showPassword = ref(false);
const pwdType = ref("password");

const togglePassword = () => {
  showPassword.value = !showPassword.value;

  if (pwdType.value === "password") pwdType.value = "text";
  else pwdType.value = "password";
};

const { isLoading, axiosError, putData } = usePushData();

watch(axiosError, (currentValue, oldValue) => {
  if (currentValue) {
    showAlert(true, currentValue, "danger");
    removeAlert();
  }

  axiosError.value = null;
});

const handleSubmit = async () => {
  if (!ssid.value || ssid.value.length < 4) {
    showAlert(true, "Please enter a valid ssid", "danger");
    removeAlert();
  } else if (!password.value || password.value.length < 6) {
    showAlert(true, "Please enter a valid password", "danger");
    removeAlert();
  } else {
    store.dispatch("setFlushMessageContext", `${ssid.value} wifi`);
    store.dispatch("setTransitFormData", {
      ssid: ssid.value,
      password: password.value,
    });

    await putData(
      `/torsk/networking/wifi/${data.value._id}`,
      "/networking/wifi"
    );
  }
};
</script>
