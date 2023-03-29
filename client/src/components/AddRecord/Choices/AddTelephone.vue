<template>
  <section class="position-container">
    <div class="add-entry-container">
      <div class="add-entry-content">
        <h2>Add a new email</h2>
        <form @submit.prevent="handleSubmit()">
          <div class="entry-control">
            <label for="">User</label>
            <input
              type="text"
              class="entry-input"
              placeholder="e.g. IT Technician"
              v-model="collective.user"
            />
          </div>
          <div class="entry-control">
            <label for="">Email</label>
            <input type="text" class="entry-input" v-model="collective.email" />
          </div>
          <div class="entry-control">
            <label for="">Password</label>
            <input
              :type="pwdType"
              class="entry-input"
              v-model="collective.password"
            />
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

          <Transition name="fade">
            <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
          </Transition>

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
//icons
import EyeOutline from "vue-material-design-icons/EyeOutline.vue";
import EyeOffOutline from "vue-material-design-icons/EyeOffOutline.vue";

import Loader from "../../BtnLoader";
import Alert from "../../Alert.vue";
import AlertFn from "../../../helpers/AlertFn.js";

import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import axios from "axios";

const store = useStore();
const router = useRouter();

const isLoading = ref(false);
const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const collective = reactive({
  user: "",
  email: "",
  password: "",
});

const showPassword = ref(false);
const pwdType = ref("password");

const togglePassword = () => {
  showPassword.value = !showPassword.value;

  if (pwdType.value === "password") pwdType.value = "text";
  else pwdType.value = "password";
};

const handleSubmit = async () => {
  if (!collective.user) {
    showAlert(true, "User field is empty", "danger");
    removeAlert();
  } else if (!collective.email) {
    showAlert(true, "Email field is empty", "danger");
    removeAlert();
  } else if (!collective.password) {
    showAlert(true, "Password field is empty", "danger");
    removeAlert();
  } else {
    try {
      isLoading.value = true;

      const res = await axios.post("/torsk/email/", {
        user: collective.user,
        email: collective.email,
        password: collective.password,
      });

      isLoading.value = false;

      store.dispatch("setShowFlushMessage", {
        state: true,
        action: "added",
        context: collective.email,
      });

      setTimeout(() => {
        store.dispatch("setShowFlushMessage", { state: false });
        router.push("/emails");
      }, 3000);
    } catch (err) {
      isLoading.value = false;
      showAlert(true, err.response.data.err, "danger");
      removeAlert();
    }
  }
};
</script>
