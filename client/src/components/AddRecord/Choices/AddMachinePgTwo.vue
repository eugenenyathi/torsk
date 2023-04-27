<template>
  <div>
    <Transition name="fade">
      <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
    </Transition>
    <form @submit.prevent="next()">
      <div class="entry-control">
        <label>Operating system</label>
        <SelectBox
          v-if="!showOsCustomInput"
          context="operating system"
          :options="osOptions"
          :prevSelectedOption="collection.os"
          @optionNotListed="showOsCustomInput = true"
          @selectedOption="setOs"
        />
        <input
          v-else
          type="text"
          class="entry-input"
          placeholder="e.g. Windows 11"
          v-model="collection.os"
        />
      </div>
      <div class="entry-control cpu">
        <label>CPU</label>
        <div class="inner-control">
          <SelectBox
            v-if="!showCPUCustomInput"
            context="cpu"
            :options="cpuOptions"
            :prevSelectedOption="collection.cpu"
            @selectedOption="setCPU"
            @optionNotListed="showCPUCustomInput = true"
          />
          <input
            v-else
            type="text"
            class="entry-input"
            placeholder="e.g. Core i3"
            v-model="collection.cpu"
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
      <div class="entry-control cpu">
        <label>RAM</label>
        <div class="inner-control">
          <SelectBox
            context="ram"
            :options="ramOptions"
            :prevSelectedOption="collection.ram"
            @selectedOption="setRAM"
          />
          <span class="cool-span">GB</span>
        </div>
      </div>
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
      <button class="add-btn next-btn">continue</button>
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

import SelectBox from "@/base/SelectBox.vue";
import Alert from "@/components/Alert.vue";
import AlertFn from "@/helpers/AlertFn.js";

import { useStore } from "vuex";
import { ref, computed, reactive } from "vue";

const store = useStore();
const emit = defineEmits(["next", "pop"]);

const osOptions = [
  "Windows 7",
  "Windows 8",
  "Windows 8.1",
  "Windows 10",
  "Windows 11",
  "Mac",
  "Linux",
  "Other",
];

const cpuOptions = [
  "Dual Core",
  "Core i3",
  "Core i4",
  "Core i5",
  "Core i6",
  "Core i7",
  "Core i9",
  "Other",
];

const ramOptions = [1, 2, 3, 4, 5, 6, 8, 12, 16];
const data = computed(() => store.getters.getTransitFormData);

const collection = reactive({
  os: data.value.os || "",
  cpu: data.value.cpu || "",
  cpuGen: data.value.cpuGen || 8,
  ram: data.value.ram || 4,
  storageType: data.value.storageType || "HDD",
  storageGigs: data.value.storageGigs || 450,
});

const showOsCustomInput = ref(false);
const showCPUCustomInput = ref(false);

const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const setOs = (option) => {
  collection.os = option;
};

const setCPU = (option) => {
  collection.cpu = option;
};

const setRAM = (option) => {
  collection.ram = option;
};

const next = () => {
  if (!collection.os || collection.os.length < 3) {
    showAlert(true, "Please select your operating system", "danger");
    removeAlert();
  } else if (!collection.storageType) {
    showAlert(true, "Please select your storage type", "danger");
    removeAlert();
  } else if (!collection.storageGigs) {
    showAlert(true, "Please enter valid storage gigs", "danger");
    removeAlert();
  } else if (!collection.cpu || collection.cpu.length < 6) {
    showAlert(true, "Please select a cpu", "danger");
    removeAlert();
  } else if (!collection.cpuGen) {
    showAlert(true, "Please enter the cpu generation", "danger");
    removeAlert();
  } else if (!collection.ram) {
    showAlert(true, "Please enter a valid ram number", "danger");
    removeAlert();
  } else {
    store.dispatch("setTransitFormData", {
      os: collection.os,
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
