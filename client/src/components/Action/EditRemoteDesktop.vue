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

import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import axios from "axios";

const data = computed(() => store.getters.getTransitData);

const store = useStore();
const router = useRouter();

const address = ref(data.value.address);

const isLoading = ref(false);
const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const handleSubmit = async () => {
  if (!address.value) {
    showAlert(true, "The address field is empty", "danger");
    removeAlert();
  } else {
    try {
      isLoading.value = true;

      const res = await axios.put(`/torsk/remote_desktop/${data.value._id}`, {
        address: address.value,
      });

      isLoading.value = false;

      store.dispatch("setShowFlushMessage", {
        state: true,
        action: "updated",
        context: data.value.user,
      });

      setTimeout(() => {
        store.dispatch("setShowFlushMessage", { state: false });
        router.push("/remote");
      }, 3000);
    } catch (err) {
      isLoading.value = false;
      console.log(err);
      // showAlert(true, err.response.data.err, "danger");
      // removeAlert();
    }
  }
};
</script>
