<template>
  <div>
    <h2>Add a server</h2>
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
        <label for="">Machine</label>
        <input
          type="text"
          class="entry-input"
          placeholder="e.g. DESKTOP-34562"
          v-model="collection.machine"
        />
      </div>
      <div class="entry-control">
        <label for="">Model</label>
        <input
          type="text"
          class="entry-input"
          placeholder="e.g. HP P250"
          v-model="collection.model"
        />
      </div>
      <button class="add-btn next-btn">Continue</button>
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

const data = computed(() => store.getters.getTransitFormData);

const collection = reactive({
  location: data.value.user || "IT server room",
  machine: data.value.machine || "PromunServer",
  model: data.value.model || "HP ProLiant",
});

const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const next = () => {
  if (!collection.location || collection.location.length < 2) {
    showAlert(true, "Please enter a valid location", "danger");
    removeAlert();
  } else if (!collection.machine || collection.machine.length < 3) {
    showAlert(true, "Please enter a valid computer name", "danger");
    removeAlert();
  } else if (!collection.model || collection.model.length < 6) {
    showAlert(true, "Please enter a valid model", "danger");
    removeAlert();
  } else {
    store.dispatch("setTransitFormData", {
      location: collection.location,
      machine: collection.machine,
      model: collection.model,
    });
    emit("next", 2);
  }
};
</script>
