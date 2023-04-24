<template>
  <section class="position-container">
    <div class="add-entry-container">
      <div class="add-entry-content">
        <h2>Add a new address</h2>
        <form @submit.prevent="handleSubmit()">
          <div class="entry-control">
            <label for="">User</label>
            <SelectBox :data="machines" context="user" @option="setMachineId" />
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

import usePushData from "@/composables/usePushData";
import useAuth from "@/composables/useAuth";

import { ref, reactive, computed, watch } from "vue";
import { useStore } from "vuex";

import axios from "axios";

const store = useStore();
const { getAuthUser } = useAuth();
const authUser = getAuthUser();

const data = computed(() => store.getters.getTransitFormData);

const machines = ref([]);
const machineId = ref(false);
const address = ref(data.value.address);
const user = ref(data.value.user);

const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const fetchMachines = async () => {
  try {
    const res = await axios("/torsk/devices/machines/", {
      headers: {
        Authorization: `Bearer ${authUser.token}`,
      },
    });
    machines.value = res.data.data;
  } catch (err) {
    console.log(err);
  }
};

fetchMachines();

const setMachineId = (data) => {
  machineId.value = data._id;
  user.value = data.user;
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
  if (!machineId.value) {
    showAlert(true, "The user field is empty", "danger");
    removeAlert();
  } else if (!address.value) {
    showAlert(true, "The address field is empty", "danger");
    removeAlert();
  } else {
    store.dispatch("setFlushMessageContext", `${user.value}'s address`);
    store.dispatch("setTransitFormData", {
      address: address.value,
    });

    await postData("/remote", `/torsk/remote_desktop/${machineId.value}`);
  }
};
</script>
