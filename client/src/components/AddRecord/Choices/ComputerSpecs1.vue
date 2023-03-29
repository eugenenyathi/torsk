<template>
  <div>
    <h2>Add a new machine</h2>
    <Transition name="fade">
      <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
    </Transition>
    <form @submit.prevent="next()">
      <div class="entry-control">
        <label for="">Model</label>
        <input
          type="text"
          class="entry-input"
          placeholder="e.g. HP P250"
          v-model="collection.model"
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
        <label>Operating system</label>
        <SelectBox
          context="operating system"
          :options="osOptions"
          @selectedOption="setOs"
        />
      </div>
      <div class="entry-control cpu">
        <label>CPU</label>
        <div class="inner-control">
          <SelectBox
            context="cpu"
            :options="cpuOptions"
            @selectedOption="setCPU"
          />
          <div class="grand-child-control">
            <input
              type="number"
              class="entry-input"
              placeholder="8"
              v-model="collection.cpuGen"
            />
            <span class="cool-span">Gen</span>
          </div>
        </div>
      </div>
      <button class="add-btn">Continue</button>
    </form>
  </div>
</template>

<script setup>
import SelectBox from "@/base/SelectBox.vue";

import Alert from "@/components/Alert.vue";
import AlertFn from "@/helpers/AlertFn.js";

import { useStore } from "vuex";
import { reactive } from "vue";

const store = useStore();
const emit = defineEmits(["next"]);

const osOptions = [
  "Windows 7",
  "Windows 8",
  "Windows 8.1",
  "Windows 10",
  "Windows 11",
  "Mac",
  "Linux",
];

const cpuOptions = [
  "Dual Core",
  "Core i3",
  "Core i4",
  "Core i5",
  "Core i6",
  "Core i7",
  "Core i9",
];

const collection = reactive({
  model: "HP 250 G7 Notebook",
  machine: "Committees",
  os: "",
  cpu: "",
  cpuGen: 8,
});

const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const setOs = (option) => {
  collection.os = option;
};

const setCPU = (option) => {
  collection.cpu = option;
};

const next = () => {
  if (!collection.model || collection.model.length < 6) {
    showAlert(true, "Please enter a valid model", "danger");
    removeAlert();
  } else if (!collection.machine || collection.machine.length < 3) {
    showAlert(true, "Please enter a valid computer name", "danger");
    removeAlert();
  } else if (!collection.os || collection.os.length < 3) {
    showAlert(true, "Please select your operating system", "danger");
    removeAlert();
  } else if (!collection.cpu || collection.cpu.length < 6) {
    showAlert(true, "Please select a cpu", "danger");
    removeAlert();
  } else if (!collection.cpuGen) {
    showAlert(true, "Please enter the cpu generation", "danger");
    removeAlert();
  } else {
    store.dispatch("setTransitFormData", {
      model: collection.model,
      machine: collection.machine,
      os: collection.os,
      cpu: collection.cpu,
      cpuGen: collection.cpuGen,
    });
    emit("next", 2);
  }
};
</script>
