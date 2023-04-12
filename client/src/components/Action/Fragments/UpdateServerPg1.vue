<template>
  <div>
    <form @submit.prevent="next()">
      <Transition name="fade">
        <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
      </Transition>
      <div class="update-control">
        <label for="user">Location</label>
        <input type="text" class="update-input" v-model="collection.location" />
      </div>
      <div class="update-control">
        <label for="machine">Machine</label>
        <input type="text" class="update-input" v-model="collection.machine" />
      </div>
      <div class="update-control">
        <label for="">Model</label>
        <input type="text" class="update-input" v-model="collection.model" />
      </div>
      <div class="update-control">
        <label>Operating system</label>
        <input type="text" class="update-input" v-model="collection.os" />
      </div>
      <button class="update-btn">Continue</button>
    </form>
  </div>
</template>

<script setup>
import Alert from "@/components/Alert.vue";
import AlertFn from "@/helpers/AlertFn.js";

import { useStore } from "vuex";
import { reactive, computed } from "vue";

const store = useStore();
const emit = defineEmits(["next"]);

const data = computed(() => store.getters.getTransitData);
const formData = computed(() => store.getters.getTransitFormData);

const collection = reactive({
  location: formData.value.location || data.value.location,
  machine: formData.value.machine || data.value.machine,
  model: formData.value.model || data.value.model,
  os: formData.value.os || data.value.os,
});

const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const next = () => {
  if (!collection.location || collection.location.length < 2) {
    showAlert(true, "Please enter a valid location", "danger");
    removeAlert();
  } else if (!collection.model || collection.model.length < 6) {
    showAlert(true, "Please enter a valid model", "danger");
    removeAlert();
  } else if (!collection.machine || collection.machine.length < 3) {
    showAlert(true, "Please enter a valid computer name", "danger");
    removeAlert();
  } else if (!collection.os || collection.os.length < 3) {
    showAlert(true, "Please select your operating system", "danger");
    removeAlert();
  } else {
    store.dispatch("setTransitFormData", {
      location: collection.location,
      model: collection.model,
      machine: collection.machine,
      os: collection.os,
    });
    emit("next", 2);
  }
};
</script>
