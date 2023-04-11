<template>
  <section v-if="action === 'update'" class="update-container action-info">
    <div class="update-content">
      <Transition name="switch" mode="out-in">
        <div v-if="page === 1">
          <Transition name="fade">
            <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
          </Transition>
          <form @submit.prevent="next()">
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
              <input
                type="text"
                class="update-input"
                v-model="collection.model"
              />
            </div>
            <div class="update-control">
              <label for="">IP Address</label>
              <input
                type="text"
                class="update-input"
                v-model="collection.ipAddress"
              />
            </div>
            <button class="update-btn">continue</button>
          </form>
        </div>
        <div v-else>
          <Transition name="fade">
            <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
          </Transition>
          <form @submit.prevent="handleSubmit()">
            <div class="update-control">
              <label for="">Serial Number</label>
              <input
                type="text"
                class="update-input"
                v-model="collection.serialNumber"
              />
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
              <div class="checkbox-wrapper wireless">
                <label
                  for="wireless"
                  :class="{
                    'checkbox-visual': !collection.wireless,
                    'checkbox-visual active': collection.wireless,
                  }"
                >
                  <Plus class="plus-icon" v-if="!collection.wireless" />
                  <Check class="plus-icon" v-else />

                  Wireless
                </label>
                <input
                  type="radio"
                  id="wireless"
                  class="checkbox-input"
                  v-model="collection.wireless"
                  :value="!collection.wireless"
                />
              </div>
            </div>

            <button v-if="!isLoading" class="update-btn" :disabled="isLoading">
              update
            </button>
            <button v-else class="update-btn" :disabled="isLoading">
              update
              <Loader />
            </button>
            <div class="go-back" @click="pop()">
              <ChevronRight />
              <span>Back</span>
            </div>
          </form>
        </div>
      </Transition>
    </div>
  </section>
  <State v-else :action="action" :context="context" />
</template>

<script setup>
import Plus from "vue-material-design-icons/Plus.vue";
import Check from "vue-material-design-icons/Check.vue";
import ChevronRight from "vue-material-design-icons/ChevronRight.vue";

import State from "./ActionState";
import Loader from "../BtnLoader";
import Alert from "../Alert.vue";
import AlertFn from "../../helpers/AlertFn.js";

import usePushData from "@/composables/usePushData";

import { ref, reactive, computed, watch } from "vue";
import { useStore } from "vuex";

const page = ref(1);

const props = defineProps({
  action: String,
  context: String,
});

const store = useStore();
const data = computed(() => store.getters.getTransitData);

const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const collection = reactive({
  deviceId: data.value._id,
  location: data.value.location,
  model: data.value.model,
  ipAddress: data.value.ipAddress,
  serialNumber: data.value.serialNumber,
  ports: data.value.ports,
  deadPorts: data.value.deadPorts,
  wireless: data.value.wireless,
});

const next = () => {
  if (!collection.location || collection.location.length < 2) {
    showAlert(true, "Please enter a valid location", "danger");
    removeAlert();
  } else if (!collection.model || collection.model.length < 2) {
    showAlert(true, "Please enter a valid model", "danger");
    removeAlert();
  } else if (
    !collection.ipAddress ||
    collection.ipAddress.length < 8 ||
    collection.ipAddress.length > 16
  ) {
    showAlert(true, "Please enter a valid model", "danger");
    removeAlert();
  } else {
    page.value = 2;
  }
};

const { isLoading, axiosError, putData } = usePushData();

watch(axiosError, (currentValue, oldValue) => {
  if (currentValue) {
    showAlert(true, currentValue, "danger");
    removeAlert();
  }

  axiosError.value = null;
});

const handleSubmit = async () => {
  if (!collection.serialNumber || collection.serialNumber.length < 6) {
    showAlert(true, "Please enter a valid serial number", "danger");
    removeAlert();
  } else if (!collection.ports) {
    showAlert(true, "The ports field can not be empty", "danger");
    removeAlert();
  } else {
    store.dispatch("setFlushMessageContext", `${collection.location} router`);
    store.dispatch("setTransitFormData", {
      location: collection.location,
      model: collection.model,
      ipAddress: collection.ipAddress,
      serialNumber: collection.serialNumber,
      ports: collection.ports,
      deadPorts: collection.deadPorts,
      wireless: collection.wireless,
    });

    await putData(`/torsk/networking/routers/${collection.deviceId}`);
  }
};

const pop = () => {
  page.value = 1;
};
</script>
