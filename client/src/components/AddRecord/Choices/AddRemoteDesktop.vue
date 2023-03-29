<template>
  <section class="position-container">
    <div class="add-entry-container">
      <div class="add-entry-content">
        <h2>Add a new address</h2>
        <form @submit.prevent="handleSubmit()">
          <div class="entry-control">
            <label for="">User</label>
            <SelectBox :data="machines" @option="setMachineId" />
          </div>
          <div class="entry-control">
            <label for="">Remote Address</label>
            <input
              type="number"
              class="entry-input"
              placeholder="e.g. 400444555"
              v-model="address"
            />
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
import SelectBox from "../../../base/SearchableSelectBx.vue";
import Loader from "../../BtnLoader";
import Alert from "../../Alert.vue";
import AlertFn from "../../../helpers/AlertFn.js";

import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import axios from "axios";

const store = useStore();
const router = useRouter();

const machines = ref([]);
const machineId = ref(false);
const address = ref(1234567895);

const isLoading = ref(false);
const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const fetchMachines = async () => {
  try {
    const res = await axios("/torsk/devices/machines/");
    machines.value = res.data.machines;
  } catch (err) {
    console.log(err);
  }
};

fetchMachines();

const setMachineId = (id) => {
  machineId.value = id;
};

const handleSubmit = async () => {
  if (!machineId.value) {
    showAlert(true, "The user field is empty", "danger");
    removeAlert();
  } else if (!address.value) {
    showAlert(true, "The address field is empty", "danger");
    removeAlert();
  } else {
    try {
      isLoading.value = true;

      const res = await axios.post(`/torsk/remote_desktop/${machineId.value}`, {
        address: address.value,
      });

      isLoading.value = false;

      store.dispatch("setShowFlushMessage", {
        state: true,
        action: "added",
        context: address,
      });

      setTimeout(() => {
        store.dispatch("setShowFlushMessage", { state: false });
        router.push("/remote");
      }, 3000);
    } catch (err) {
      isLoading.value = false;
      showAlert(true, err.response.data.err, "danger");
      // removeAlert();
    }
  }
};
</script>
