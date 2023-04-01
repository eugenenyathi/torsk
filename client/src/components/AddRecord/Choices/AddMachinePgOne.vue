<template>
  <div>
    <h2>Add a new machine</h2>
    <Transition name="fade">
      <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
    </Transition>
    <form @submit.prevent="next()">
      <div class="entry-control">
        <div class="storage-wrapper">
          <div class="storage-radio-wrapper">
            <div class="checkbox-wrapper">
              <label
                for="desktop"
                :class="{
                  'checkbox-visual': collection.machineType !== 'desktop',
                  'checkbox-visual active':
                    collection.machineType === 'desktop',
                }"
              >
                <Plus
                  class="plus-icon"
                  v-if="collection.machineType !== 'desktop'"
                />
                <Check
                  class="plus-icon"
                  v-else-if="collection.machineType === 'desktop'"
                />

                Desktop
              </label>
              <input
                type="radio"
                id="desktop"
                class="checkbox-input"
                v-model="collection.machineType"
                value="desktop"
              />
            </div>
            <div class="checkbox-wrapper">
              <label
                for="laptop"
                :class="{
                  'checkbox-visual': collection.machineType !== 'laptop',
                  'checkbox-visual active': collection.machineType === 'laptop',
                }"
              >
                <Plus
                  class="plus-icon"
                  v-if="collection.machineType !== 'laptop'"
                />
                <Check
                  class="plus-icon"
                  v-else-if="collection.machineType === 'laptop'"
                />
                Laptop
              </label>
              <input
                type="radio"
                id="laptop"
                class="checkbox-input"
                v-model="collection.machineType"
                value="laptop"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="entry-control">
        <label for="">User</label>
        <input
          type="text"
          class="entry-input"
          placeholder="e.g. HP P250"
          v-model="collection.user"
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
      <div class="entry-control">
        <label for="">Machine</label>
        <input
          type="text"
          class="entry-input"
          placeholder="e.g. DESKTOP-34562"
          v-model="collection.machine"
        />
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
import { reactive, computed } from "vue";

const store = useStore();
const emit = defineEmits(["next"]);

const data = computed(() => store.getters.getTransitFormData);

const collection = reactive({
  machineType: data.value.machineType || "desktop",
  user: data.value.user || "Committees Officer",
  model: data.value.model || "HP 250 G7 Notebook",
  machine: data.value.machine || "Committees",
});

const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const next = () => {
  if (!collection.machineType) {
    showAlert(true, "Please select a machine type", "danger");
    removeAlert();
  } else if (!collection.model || collection.model.length < 6) {
    showAlert(true, "Please enter a valid model", "danger");
    removeAlert();
  } else if (!collection.machine || collection.machine.length < 3) {
    showAlert(true, "Please enter a valid computer name", "danger");
    removeAlert();
  } else {
    store.dispatch("setTransitFormData", {
      user: collection.user,
      machineType: collection.machineType,
      model: collection.model,
      machine: collection.machine,
    });
    emit("next", 2);
  }
};
</script>
