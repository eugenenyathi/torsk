<template>
  <main class="login-container">
    <section class="login-content">
      <div class="login-img-wrapper">
        <img :src="loginImg" alt="torsk-img" class="login-img" />
      </div>

      <form class="login-form" @submit.prevent="handleSubmit">
        <span class="krynn-logo">Torsk</span>
        <h2
          :class="{
            header: !alert.show,
            'header show-alert': alert.show,
          }"
        >
          Welcome to the Planet.
        </h2>

        <Transition name="fade">
          <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
        </Transition>
        <div class="login-control">
          <input
            type="text"
            class="login-input"
            placeholder="Username"
            v-model="username"
          />
        </div>

        <div class="login-control">
          <input
            :type="pwdType"
            class="login-input"
            placeholder="Password"
            v-model="password"
          />
          <button
            v-if="!showPassword"
            type="button"
            class="eye-icon"
            @click="togglePassword"
          >
            <EyeOutline />
          </button>
          <button v-else type="button" class="eye-icon" @click="togglePassword">
            <EyeOffOutline />
          </button>
        </div>
        <button class="login-btn" :disabled="isLoading">let's go</button>

        <router-link
          v-if="!userExists"
          to="/signup"
          class="link-login link link-center"
        >
          Join the planet. Single Ticket Sign up.
        </router-link>
      </form>
    </section>
  </main>
</template>

<script setup>
//TODO add secret signup page
//TODO add ipAddress Management
import Alert from "@/components/Alert.vue";

//icons
import EyeOutline from "vue-material-design-icons/EyeOutline.vue";
import EyeOffOutline from "vue-material-design-icons/EyeOffOutline.vue";

//composables
import useLogin from "@/composables/useLogin";

//helpers
import AlertFn from "@/helpers/AlertFn.js";
import validatePassword from "@/helpers/validatePassword.js";

//vue
import { ref, reactive, watch } from "vue";

//assets
const loginImg = require("@/assets/krynn-1.webp");

const username = ref("superadmin");
const password = ref("Trish15122010!");
const showPassword = ref(false);
const pwdType = ref("password");

const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);
const { isLoading, userExists, axiosError, login, checkUser } = useLogin();

watch(axiosError, (currentValue, oldValue) => {
  if (currentValue) {
    showAlert(true, currentValue, "danger");
    removeAlert();
  }

  axiosError.value = null;
});

const togglePassword = () => {
  showPassword.value = !showPassword.value;

  if (pwdType.value === "password") pwdType.value = "text";
  else pwdType.value = "password";
};

const handleSubmit = async () => {
  if (!username.value || username.value.length < 3) {
    showAlert(true, "Minimum username length is 3", "danger");
    removeAlert();
  } else if (validatePassword(password.value) !== true) {
    const error = validatePassword(password.value);
    showAlert(true, "Password: " + error, "danger");
    removeAlert();
  } else {
    //send data to backend
    await login(username.value, password.value);
  }
};

checkUser();
</script>
