<template>
  <section class="position-container">
    <div class="add-entry-container">
      <div class="add-entry-content">
        <h2>Add a new scanner</h2>
        <Transition name="fade">
          <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
        </Transition>
        <form @submit.prevent="handleSubmit()">
          <div class="entry-control">
            <label for="">User</label>
            <SelectBox :data="machines" context="user" @option="setMachineId" />
          </div>
          <div class="entry-control">
            <label for="">Model</label>
            <input
              type="text"
              class="entry-input"
              placeholder="e.g. HP Scanjet N6310"
              v-model="collection.model"
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
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import Loader from "@/components/BtnLoader";
import SelectBox from "@/base/SearchableSelectBx.vue";
import Alert from "@/components/Alert.vue";
import AlertFn from "@/helpers/AlertFn.js";

import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import axios from "axios";

const store = useStore();
const router = useRouter();

const isLoading = ref(false);
const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const machines = ref([]);
const collection = reactive({
  machineId: "",
  model: "HP Scanjet N6310",
  serialNumber: "11245-6789",
});

const fetchMachines = async () => {
  try {
    const res = await axios("/torsk/devices/machines");
    machines.value = res.data.machines;
  } catch (err) {
    console.log(err);
  }
};

fetchMachines();

const setMachineId = (id) => {
  collection.machineId = id;
};

const handleSubmit = async () => {
  if (!collection.model || collection.model.length < 2) {
    showAlert(true, "Please enter a valid model", "danger");
    removeAlert();
  } else if (!collection.machineId || collection.machineId.length != 24) {
    showAlert(true, "Please select a user", "danger");
    removeAlert();
  } else if (!collection.serialNumber || collection.serialNumber.length < 6) {
    showAlert(true, "Please enter a valid serial number", "danger");
    removeAlert();
  } else {
    try {
      isLoading.value = true;

      const res = await axios.post(
        `/torsk/office_equipment/scanner/${collection.machineId}`,
        {
          model: collection.model,
          serialNumber: collection.serialNumber,
        }
      );

      isLoading.value = false;

      store.dispatch("setShowFlushMessage", {
        state: true,
        action: "added",
        context: `${collection.model} scanner`,
      });

      setTimeout(() => {
        store.dispatch("setShowFlushMessage", { state: false });
        router.push("/office-equipment/scanners");
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
