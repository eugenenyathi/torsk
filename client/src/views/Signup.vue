<template>
  <main class="signup-container">
    <section class="signup-content">
      <div class="front-img-wrapper">
        <img :src="loginImg" alt="" class="front-img" />
      </div>
      <!-- components -->
      <form class="signup-form" @submit.prevent="handleSubmit">
        <span class="krynn-logo">Torsk</span>
        <h2
          :class="{
            header: !alert.show,
            'header show-alert': alert.show,
          }"
        >
          You are god in this planet.
        </h2>
        <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
        <div class="signup-control fullName-control">
          <input
            type="text"
            class="signup-input firstName"
            v-model="fullName.firstName"
            placeholder="First Name"
          />
          <input
            type="text"
            class="signup-input lastName"
            v-model="fullName.lastName"
            placeholder="Last Name"
          />
        </div>

        <div class="signup-control">
          <!-- <label for="">Username</label> -->
          <input
            type="text"
            class="signup-input"
            v-model="username"
            placeholder="Username"
          />
        </div>

        <div class="signup-control">
          <!-- <label for="">Password</label> -->
          <input
            :type="pwdType"
            class="signup-input"
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

        <button v-if="!isLoading" class="signup-btn" :disabled="isLoading">
          Sign Up
        </button>
        <button v-else class="signup-btn" :disabled="isLoading">
          Sign Up
          <Loader />
        </button>

        <router-link to="/login" class="link-login link link-center">
          See the planet, Login.
        </router-link>
      </form>
    </section>
  </main>
</template>

<script setup>
//icons
import EyeOutline from "vue-material-design-icons/EyeOutline.vue";
import EyeOffOutline from "vue-material-design-icons/EyeOffOutline.vue";

import Loader from "@/components/BtnLoader";
import Alert from "@/components/Alert.vue";
import AlertFn from "@/helpers/AlertFn.js";
import watchFn from "@/helpers/watchFn";
import validatePassword from "@/helpers/validatePassword.js";

//assets
const loginImg = require("@/assets/krynn-1.webp");

import useSignup from "@/composables/useSignup.js";

import { ref, reactive } from "vue";

const fullName = reactive({ firstName: "eugene", lastName: "nyathi" });
const username = ref("superadmin");
const password = ref("Trish15122010!");
const showPassword = ref(false);
const pwdType = ref("password");

const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);
const { watchAxiosErr } = watchFn();

const togglePassword = () => {
  showPassword.value = !showPassword.value;

  if (pwdType.value === "password") pwdType.value = "text";
  else pwdType.value = "password";
};

const { axiosError, isLoading, signup } = useSignup();

watchAxiosErr(alert, axiosError);

const handleSubmit = async () => {
  if (!fullName.firstName || !fullName.lastName) {
    showAlert(true, "Please fill in all name fields", "danger");
    removeAlert();
  } else if (!username.value || username.value.length < 3) {
    showAlert(true, "Minimum username length is 3", "danger");
    removeAlert();
  } else if (validatePassword(password.value) !== true) {
    const error = validatePassword(password.value);
    showAlert(true, "Password: " + error, "danger");
    removeAlert();
  } else {
    const data = {
      fullName: fullName.firstName + " " + fullName.lastName,
      username: username.value,
      password: password.value,
    };
    //send data to the backend
    await signup(data);
  }
};
</script>
