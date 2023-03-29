<template>
  <section class="position-container">
    <div class="add-entry-container">
      <div class="add-entry-content">
        <Transition name="switch" mode="out-in">
          <div v-if="page === 1">
            <h2>Add a new switch</h2>
            <Transition name="fade">
              <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
            </Transition>
            <form @submit.prevent="next()">
              <div class="entry-control">
                <label for="">Location</label>
                <input
                  type="text"
                  class="entry-input"
                  placeholder="e.g. server room"
                  v-model="collection.location"
                />
              </div>
              <div class="entry-control">
                <label for="">Model</label>
                <input
                  type="text"
                  class="entry-input"
                  placeholder="e.g. TPLink R200"
                  v-model="collection.model"
                />
              </div>
              <div class="entry-control">
                <label for="">Ports</label>
                <input
                  type="number"
                  class="entry-input"
                  v-model="collection.ports"
                />
              </div>
              <button class="add-btn" :disabled="isLoading">continue</button>
            </form>
          </div>
          <div v-else>
            <Transition name="fade">
              <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
            </Transition>
            <form @submit.prevent="handleSubmit()">
              <div class="entry-control">
                <label for="">Dead ports</label>
                <input
                  type="number"
                  class="entry-input"
                  v-model="collection.deadPorts"
                />
              </div>
              <div class="entry-control">
                <label for="">Serial Number</label>
                <input
                  type="text"
                  class="entry-input"
                  v-model="collection.serialNumber"
                />
              </div>

              <button v-if="!isLoading" class="add-btn" :disabled="isLoading">
                add
              </button>
              <button v-else class="add-btn" :disabled="isLoading">
                add
                <Loader />
              </button>

              <div class="go-back add" @click="pop()">
                <ChevronRight />
                <span>Back</span>
              </div>
            </form>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>

<script setup>
import ChevronRight from "vue-material-design-icons/ChevronRight.vue";

import Loader from "../../BtnLoader";
import Alert from "../../Alert.vue";
import AlertFn from "../../../helpers/AlertFn.js";

import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import axios from "axios";

const page = ref(1);

const store = useStore();
const router = useRouter();

const isLoading = ref(false);
const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const collection = reactive({
  location: "Accounts",
  model: "tp-link",
  serialNumber: "11354-5689",
});

const next = () => {
  if (!collection.location || collection.location.length < 2) {
    showAlert(true, "Please enter a valid location", "danger");
    removeAlert();
  } else if (!collection.model || collection.model.length < 2) {
    showAlert(true, "Please enter a valid model", "danger");
    removeAlert();
  } else if (
    !collection.ports ||
    collection.ports < 8 ||
    collection.ports % 2 !== 0
  ) {
    showAlert(true, "Please enter a valid ports number", "danger");
    removeAlert();
  } else {
    page.value = 2;
  }
};

const handleSubmit = async () => {
  if (!collection.serialNumber || collection.serialNumber.length < 6) {
    showAlert(true, "Please enter a valid serial number", "danger");
    removeAlert();
  } else {
    try {
      isLoading.value = true;

      const res = await axios.post("/torsk/networking/switch", {
        location: collection.location,
        model: collection.model,
        ports: collection.ports,
        deadPorts: collection.deadPorts,
        serialNumber: collection.serialNumber,
      });

      isLoading.value = false;

      store.dispatch("setShowFlushMessage", {
        state: true,
        action: "added",
        context: `${collection.location} switch`,
      });

      setTimeout(() => {
        store.dispatch("setShowFlushMessage", { state: false });
        router.push("/networking/switches");
      }, 3000);
    } catch (err) {
      isLoading.value = false;
      console.log(err);
      showAlert(true, err.response.data.err, "danger");
      removeAlert();
    }
  }
};

const pop = () => {
  page.value = 1;
};
</script>
