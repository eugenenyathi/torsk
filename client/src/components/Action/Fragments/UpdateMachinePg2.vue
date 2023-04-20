<template>
  <div>
    <form @submit.prevent="next()">
      <Transition name="fade">
        <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
      </Transition>
      <div class="update-control cpu">
        <label>CPU</label>
        <div class="inner-control">
          <input type="text" class="update-input" v-model="collection.cpu" />
          <div class="grand-child-control">
            <input
              type="number"
              class="update-input"
              v-model="collection.cpuGen"
            />
            <span class="cool-span">Gen</span>
          </div>
        </div>
      </div>
      <div class="update-control cpu">
        <label>RAM</label>
        <div class="inner-control">
          <input type="number" class="update-input" v-model="collection.ram" />
          <span class="cool-span">GB</span>
        </div>
      </div>
      <div class="update-control">
        <label for="">Storage</label>
        <div class="storage-wrapper">
          <div class="storage-radio-wrapper">
            <div class="checkbox-wrapper">
              <label
                for="hdd"
                :class="{
                  'checkbox-visual': collection.storageType !== 'HDD',
                  'checkbox-visual active': collection.storageType === 'HDD',
                }"
              >
                <Plus
                  class="plus-icon"
                  v-if="collection.storageType !== 'HDD'"
                />
                <Check
                  class="plus-icon"
                  v-else-if="collection.storageType === 'HDD'"
                />

                HDD
              </label>
              <input
                type="radio"
                id="hdd"
                class="checkbox-input"
                v-model="collection.storageType"
                value="HDD"
              />
            </div>
            <div class="checkbox-wrapper">
              <label
                for="ssd"
                :class="{
                  'checkbox-visual': collection.storageType !== 'SSD',
                  'checkbox-visual active': collection.storageType === 'SSD',
                }"
              >
                <Plus
                  class="plus-icon"
                  v-if="collection.storageType !== 'SSD'"
                />
                <Check
                  class="plus-icon"
                  v-else-if="collection.storageType === 'SSD'"
                />
                SSD
              </label>
              <input
                type="radio"
                id="ssd"
                class="checkbox-input"
                v-model="collection.storageType"
                value="SSD"
              />
            </div>
          </div>
          <div class="storage-input-wrapper">
            <input
              type="number"
              class="update-input"
              v-model="collection.storageGigs"
            />
            <span class="cool-span">GB</span>
          </div>
        </div>
      </div>

      <button class="update-btn next-btn">continue</button>
      <div class="go-back" @click="$emit('pop', 1)">
        <ChevronRight />
        <span>Back</span>
      </div>
    </form>
  </div>
</template>

<script setup>
import Plus from "vue-material-design-icons/Plus.vue";
import Check from "vue-material-design-icons/Check.vue";
import ChevronRight from "vue-material-design-icons/ChevronRight.vue";

import Alert from "@/components/Alert.vue";
import AlertFn from "@/helpers/AlertFn.js";

import { useStore } from "vuex";
import { ref, computed, reactive } from "vue";

const store = useStore();
const emit = defineEmits(["next", "pop"]);

const data = computed(() => store.getters.getTransitData);
const formData = computed(() => store.getters.getTransitFormData);

const collection = reactive({
  cpu: formData.value.macAddress || data.value.cpu,
  cpuGen: formData.value.cpuGen || data.value.cpuGen,
  ram: formData.value.ram || data.value.ram,
  storageType: formData.value.storageType || data.value.storageType,
  storageGigs: formData.value.storageGigs || data.value.storageGigs,
});

const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const next = () => {
  if (!collection.cpu || collection.cpu.length < 6) {
    showAlert(true, "Please select a cpu", "danger");
    removeAlert();
  } else if (!collection.cpuGen) {
    showAlert(true, "Please enter the cpu generation", "danger");
    removeAlert();
  } else if (!collection.storageType) {
    showAlert(true, "Please select your storage type", "danger");
    removeAlert();
  } else if (!collection.storageGigs) {
    showAlert(true, "Please enter valid storage gigs", "danger");
    removeAlert();
  } else if (!collection.ram) {
    showAlert(true, "Please enter a valid ram number", "danger");
    removeAlert();
  } else {
    store.dispatch("setTransitFormData", {
      cpu: collection.cpu,
      cpuGen: collection.cpuGen,
      ram: collection.ram,
      storageType: collection.storageType,
      storageGigs: collection.storageGigs,
    });
    emit("next", 3);
  }
};
</script>
