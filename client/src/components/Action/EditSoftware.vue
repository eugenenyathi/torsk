<template>
  <section class="position-container">
    <div class="add-entry-container">
      <div class="add-entry-content">
        <h2>Edit software</h2>
        <form @submit.prevent="handleSubmit()">
          <div class="entry-control">
            <label for="">Category</label>
            <input
              type="text"
              class="entry-input"
              v-model="collective.category"
            />
          </div>
          <div class="entry-control">
            <label for="">We run</label>
            <input
              type="text"
              class="entry-input"
              v-model="collective.software"
            />
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

const store = useStore();
const router = useRouter();

const data = computed(() => store.getters.getTransitData);

const isLoading = ref(false);
const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const collective = reactive({
  category: data.value.category,
  software: data.value.software,
});

const handleSubmit = async () => {
  if (!collective.category) {
    showAlert(true, "Category field is empty", "danger");
    removeAlert();
  } else if (!collective.software) {
    showAlert(true, "Software field is empty", "danger");
    removeAlert();
  } else {
    try {
      isLoading.value = true;

      const res = await axios.put(`/torsk/software/${data.value._id}`, {
        category: collective.category,
        software: collective.software,
      });

      isLoading.value = false;

      store.dispatch("setShowFlushMessage", {
        state: true,
        action: "updated",
        context: collective.category,
      });

      setTimeout(() => {
        store.dispatch("setShowFlushMessage", { state: false });
        router.push("/software");
      }, 3000);
    } catch (err) {
      isLoading.value = false;
      showAlert(true, err.response.data.err, "danger");
      removeAlert();
    }
  }
};
</script>
