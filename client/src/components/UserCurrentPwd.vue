<template>
  <div class="current-password">
    <h2>To change your password, please provide the current password.</h2>

    <form @submit.prevent="handleSubmit">
      <div class="settings-control">
        <BaseInput
          :type="pwdType"
          label="Current Password"
          class="settings-input"
          placeholder="Password"
          v-model="currentPassword"
        />
        <EyeIcon
          v-if="showPassword"
          class="eye-icon"
          IconType="clear"
          @btnFn="togglePassword"
        />
        <EyeIcon v-else class="eye-icon" @btnFn="togglePassword" />
      </div>

      <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />

      <button class="settings-btn" :disabled="isLoading">Verify</button>
    </form>
  </div>
</template>

<script setup>
import { BaseButton, BaseInput, EyeIcon } from "../base";

import Alert from "../components/Alert.vue";
import AlertFn from "../helpers/AlertFn.js";
import watchFn from "../helpers/watchFn";
import isEmpty from "../helpers/isEmpty.js";
import useAxiosError from "../composables/useAxiosError";
import axios from "axios";

import { ref, reactive } from "vue";

const emit = defineEmits(["next"]);

const currentPassword = ref("password123");
const pwdType = ref("password");
const showPassword = ref(false);

const axiosError = ref("");
const isLoading = ref(false);
const alert = reactive({ show: false, msg: "testing", type: "success" });
const { showAlert, removeAlert } = AlertFn(alert);
const { watchAxiosErr } = watchFn();

const togglePassword = () => {
  showPassword.value = !showPassword.value;

  if (pwdType.value === "password") pwdType.value = "text";
  else pwdType.value = "password";
};

watchAxiosErr(alert, axiosError);

const handleSubmit = async () => {
  if (isEmpty(currentPassword.value)) {
    showAlert(true, "Please fill in all fields!", "danger");
    removeAlert();
  } else if (currentPassword.value.length < 8) {
    showAlert(true, "Incorrect password!", "danger");
    removeAlert();
  } else {
    try {
      isLoading.value = true;
      await axios("/users/");

      showAlert(true, "Credentials verified successfully.", "success");
      //send event to parent element only if there are no errors
      setTimeout(() => {
        emit("next");
      }, 3000);
    } catch (err) {
      useAxiosError(err, axiosError, isLoading);
    }
  }
};
</script>
