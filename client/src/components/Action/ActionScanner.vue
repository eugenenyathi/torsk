<template>
  <section v-if="action === 'update'" class="update-container action-info">
    <div class="update-content">
      <Transition name="fade">
        <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
      </Transition>
      <form @submit.prevent="handleSubmit">
        <div class="update-control">
          <label for="">User</label>
          <span class="immutable-data" v-if="!showSelectBox">
            {{ data.user }}
            <Edit class="edit-icon" @click="showSelectBox = true" />
          </span>
          <SelectBox
            v-else
            :data="machines"
            context="user"
            @option="setMachineId"
          />
        </div>
        <div class="update-control">
          <label for="">Model</label>
          <input type="text" class="update-input" v-model="collection.model" />
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
import Plus from "vue-material-design-icons/Plus.vue";
import Check from "vue-material-design-icons/Check.vue";
import Edit from "vue-material-design-icons/Pencil";

import State from "./ActionState";
import Loader from "@/components/BtnLoader";
import SelectBox from "@/base/SearchableSelectBx.vue";
import Alert from "@/components/Alert.vue";
import AlertFn from "@/helpers/AlertFn.js";

import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import axios from "axios";

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

const machines = ref([]);
const showSelectBox = ref(false);

const collection = reactive({
  scannerId: data.value._id,
  user: data.value.user,
  model: data.value.model,
  serialNumber: data.value.serialNumber,
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
  } else if (collection.machineId && collection.machineId.length != 24) {
    showAlert(true, "Please select a user", "danger");
    removeAlert();
  } else if (!collection.serialNumber || collection.serialNumber.length < 6) {
    showAlert(true, "Please enter a valid serial number", "danger");
    removeAlert();
  } else {
    try {
      isLoading.value = true;

      const res = await axios.put(
        `/torsk/office_equipment/scanner/${collection.scannerId}`,
        {
          model: collection.model,
          serialNumber: collection.serialNumber,
        }
      );

      isLoading.value = false;

      store.dispatch("setShowFlushMessage", {
        state: true,
        action: "updated",
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
</script>
