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
              v-model="collection.user"
            />
          </div>
          <div class="entry-control">
            <label for="">Email</label>
            <input type="text" class="entry-input" v-model="collection.email" />
          </div>
          <div class="entry-control">
            <label for="">Password</label>
            <input
              :type="pwdType"
              class="entry-input"
              v-model="collection.password"
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

import { ref, reactive, computed, watch } from "vue";
import { useStore } from "vuex";

import usePushData from "@/composables/usePushData";

const store = useStore();

const data = computed(() => store.getters.getTransitFormData);

const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const collection = reactive({
  user: data.value.user || "",
  email: data.value.email || "",
  password: data.value.password || "",
});

const showPassword = ref(false);
const pwdType = ref("password");

const togglePassword = () => {
  showPassword.value = !showPassword.value;

  if (pwdType.value === "password") pwdType.value = "text";
  else pwdType.value = "password";
};

const { isLoading, axiosError, postData } = usePushData();

watch(axiosError, (currentValue, oldValue) => {
  if (currentValue) {
    showAlert(true, currentValue, "danger");
    removeAlert();
  }

  axiosError.value = null;
});

const handleSubmit = async () => {
  if (!collection.user) {
    showAlert(true, "User field is empty", "danger");
    removeAlert();
  } else if (!collection.email) {
    showAlert(true, "Email field is empty", "danger");
    removeAlert();
  } else if (!collection.password) {
    showAlert(true, "Password field is empty", "danger");
    removeAlert();
  } else {
    store.dispatch("setFlushMessageContext", `${collection.user}'s email`);
    store.dispatch("setTransitFormData", {
      user: collection.user,
      email: collection.email,
      password: collection.password,
    });

    await postData("/emails", `/torsk/email/`);
  }
};
</script>
