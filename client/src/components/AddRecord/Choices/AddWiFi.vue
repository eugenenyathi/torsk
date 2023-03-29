<template>
  <section class="position-container">
    <div class="add-entry-container">
      <div class="add-entry-content">
        <h2>Add a new network</h2>
        <Transition name="fade">
          <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
        </Transition>
        <form @submit.prevent="handleSubmit()">
          <div class="entry-control">
            <label for="">Router Location</label>
            <SelectBox
              :data="routers"
              context="location"
              @option="setRouterId"
            />
          </div>
          <div class="entry-control">
            <label for="">SSID</label>
            <input
              type="text"
              class="entry-input"
              placeholder="e.g. VFCC_ICT"
              v-model="collection.ssid"
            />
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

import SelectBox from "@/base/SearchableSelectBx.vue";
import Loader from "../../BtnLoader";
import Alert from "../../Alert.vue";
import AlertFn from "../../../helpers/AlertFn.js";

import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import axios from "axios";

const store = useStore();
const router = useRouter();

const isLoading = ref(false);
const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const routers = ref([]);
const collection = reactive({
  routerId: "",
  ssid: "VFCC_ICT",
  password: "vfacouncil!",
});

const showPassword = ref(false);
const pwdType = ref("password");

const togglePassword = () => {
  showPassword.value = !showPassword.value;

  if (pwdType.value === "password") pwdType.value = "text";
  else pwdType.value = "password";
};

const fetchRouters = async () => {
  try {
    const res = await axios("/torsk/networking/device/router");
    routers.value = res.data.devices;
  } catch (err) {
    console.log(err);
  }
};

fetchRouters();

const setRouterId = (id) => {
  collection.routerId = id;
};

const handleSubmit = async () => {
  if (!collection.ssid || collection.ssid.length < 4) {
    showAlert(true, "Please enter a valid ssid", "danger");
    removeAlert();
  } else if (!collection.password || collection.password.length < 6) {
    showAlert(true, "Please enter a valid password", "danger");
    removeAlert();
  } else {
    try {
      isLoading.value = true;

      const res = await axios.post("/torsk/networking/wifi", {
        routerId: collection.routerId,
        location: collection.location,
        ssid: collection.ssid,
        password: collection.password,
      });

      isLoading.value = false;

      store.dispatch("setShowFlushMessage", {
        state: true,
        action: "added",
        context: `${collection.ssid} wifi`,
      });

      setTimeout(() => {
        store.dispatch("setShowFlushMessage", { state: false });
        router.push("/networking/wifi");
      }, 3000);
    } catch (err) {
      isLoading.value = false;
      console.log(err);
      showAlert(true, err.response.data.err, "danger");
      removeAlert();
    }
  }
};
</script>
