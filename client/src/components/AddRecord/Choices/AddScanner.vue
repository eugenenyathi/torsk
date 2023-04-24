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

import usePushData from "@/composables/usePushData";
import useAuth from "@/composables/useAuth";

import { ref, reactive, computed, watch } from "vue";
import { useStore } from "vuex";

import axios from "axios";

const store = useStore();
const { getAuthUser } = useAuth();
const user = getAuthUser();

const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const machines = ref([]);

const data = computed(() => store.getters.getTransitFormData);

const collection = reactive({
  model: data.value.model || "HP Scanjet N6310",
  serialNumber: data.value.serialNumber || "12345-6789",
});

const fetchMachines = async () => {
  try {
    const res = await axios("/torsk/devices/machines", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    machines.value = res.data.data;
  } catch (err) {
    console.log(err);
  }
};

fetchMachines();

const setMachineId = (option) => {
  collection.machineId = option._id;
  collection.user = option.user;
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
    store.dispatch("setFlushMessageContext", `${collection.user}'s scanner`);
    store.dispatch("setTransitFormData", {
      model: collection.model,
      serialNumber: collection.serialNumber,
    });

    await postData(
      "/office-equipment/scanners",
      `/torsk/office_equipment/scanners/${collection.machineId}`
    );
  }
};

const pop = () => {
  page.value = 1;
};
</script>
