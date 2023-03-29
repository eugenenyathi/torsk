<template>
  <div>
    <Transition name="fade">
      <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
    </Transition>
    <form @submit.prevent="next()">
      <div class="entry-control">
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
              type="text"
              class="entry-input"
              placeholder="e.g. 400"
              v-model="collection.storageGigs"
            />
            <span class="cool-span">GB</span>
          </div>
        </div>
      </div>
      <div class="entry-control">
        <label for="">MAC Address</label>
        <input
          type="text"
          class="entry-input"
          placeholder="Optional field"
          v-model="collection.macAddress"
        />
      </div>
      <div class="entry-control">
        <label>Desktop Serial Number</label>
        <input
          type="text"
          class="entry-input"
          v-model="collection.serialNumber"
        />
      </div>
      <div class="entry-control">
        <label>Monitor Serial Number</label>
        <input
          type="text"
          class="entry-input"
          v-model="collection.monitorSerialNumber"
        />
      </div>

      <button class="add-btn">continue</button>
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
import { ref, reactive } from "vue";

const store = useStore();
const emit = defineEmits(["pop"]);

const collection = reactive({
  storageType: "HDD",
  storageGigs: 450,
  macAddress: "12345678910101213",
  serialNumber: "123456-8942",
  monitorSerialNumber: "44356-8942",
});

const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const next = () => {
  if (!collection.storageType) {
    showAlert(true, "Please select your storage type", "danger");
    removeAlert();
  }
  if (!collection.storageGigs) {
    showAlert(true, "Please enter valid storage gigs", "danger");
    removeAlert();
  } else if (!collection.serialNumber || collection.serialNumber.length < 3) {
    showAlert(true, "Please enter a valid desktop serial number", "danger");
    removeAlert();
  } else if (
    !collection.monitorSerialNumber ||
    collection.monitorSerialNumber.length < 6
  ) {
    showAlert(true, "Please enter a valid monitor serial number", "danger");
    removeAlert();
  } else {
    store.dispatch("setTransitFormData", {
      model: collection.model,
      machine: collection.machine,
      os: collection.os,
      cpu: collection.cpu,
      cpuGen: collection.cpuGen,
    });
    emit("next", 3);
  }
};
</script>
