<template>
  <section v-if="action === 'update'" class="update-container action-info">
    <div class="update-content">
      <Transition name="fade">
        <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
      </Transition>
      <form @submit.prevent="handleSubmit()">
        <div class="update-control">
          <label for="">Location</label>
          <input
            type="text"
            class="update-input"
            v-model="collection.location"
          />
        </div>
        <div class="update-control">
          <label for="">Model</label>
          <input type="text" class="update-input" v-model="collection.model" />
        </div>
        <div class="update-control">
          <label for="">Ports</label>
          <input
            type="number"
            class="update-input"
            v-model="collection.ports"
          />
        </div>
        <div class="update-control">
          <label for="">Dead ports</label>
          <input
            type="number"
            class="update-input"
            v-model="collection.deadPorts"
          />
        </div>
        <div class="update-control">
          <label for="">Serial Number</label>
          <input
            type="text"
            class="update-input"
            v-model="collection.serialNumber"
          />
        </div>
        <button v-if="!isLoading" class="update-btn" :disabled="isLoading">
          update
        </button>
        <button v-else class="update-btn" :disabled="isLoading">
          update
          <Loader />
        </button>
      </form>
    </div>
  </section>
  <State v-else :action="action" :context="context" />
</template>

<script setup>
import State from "./ActionState";
import Loader from "../BtnLoader";
import Alert from "../Alert.vue";
import AlertFn from "../../helpers/AlertFn.js";

import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import axios from "axios";

//TODO we still have to fix re-routing to show effect of update

const page = ref(1);

const props = defineProps({
  action: String,
  context: String,
});

const store = useStore();
const router = useRouter();
const data = computed(() => store.getters.getTransitData);

const isLoading = ref(false);
const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const collection = reactive({
  deviceId: data.value._id,
  location: data.value.location,
  model: data.value.model,
  ports: data.value.ports,
  deadPorts: data.value.deadPorts,
  serialNumber: data.value.serialNumber,
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

      const res = await axios.put(
        `/torsk/networking/switch/${collection.deviceId}`,
        {
          location: collection.location,
          model: collection.model,
          ports: collection.ports,
          deadPorts: collection.deadPorts,
          serialNumber: collection.serialNumber,
        }
      );

      isLoading.value = false;

      store.dispatch("setShowFlushMessage", {
        state: true,
        action: "updated",
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
