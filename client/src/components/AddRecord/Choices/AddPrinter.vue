<template>
  <section class="position-container">
    <div class="add-entry-container">
      <div class="add-entry-content">
        <Transition name="switch" mode="out-in">
          <div v-if="page === 1">
            <h2>Add a new printer</h2>
            <Transition name="fade">
              <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
            </Transition>
            <form @submit.prevent="next()">
              <div class="entry-control">
                <label for="">User</label>
                <SelectBox
                  :data="machines"
                  context="user"
                  @option="setMachineId"
                />
              </div>
              <div class="entry-control">
                <label for="">Model</label>
                <input
                  type="text"
                  class="entry-input"
                  placeholder="e.g. HP LaserJet Pro M454dn"
                  v-model="collection.model"
                />
              </div>
              <div class="entry-control">
                <label for="">Cartridge</label>
                <input
                  type="text"
                  class="entry-input"
                  placeholder="e.g. 26A"
                  v-model="collection.cartridge"
                />
              </div>
              <button class="add-btn" :disabled="isLoading">continue</button>
            </form>
          </div>
          <div v-else>
            <Transition name="fade">
              <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
            </Transition>
            <form @submit.prevent="handleSubmit()">
              <div class="checkboxes-control">
                <div class="checkbox-wrapper">
                  <label
                    for="multi-purpose"
                    :class="{
                      'checkbox-visual': collection.multiPurpose !== 'yes',
                      'checkbox-visual active':
                        collection.multiPurpose === 'yes',
                    }"
                  >
                    <Plus
                      class="plus-icon"
                      v-if="collection.multiPurpose !== 'yes'"
                    />
                    <Check class="plus-icon" v-else />

                    multi-purpose
                  </label>
                  <input
                    type="checkbox"
                    id="multi-purpose"
                    class="checkbox-input"
                    true-value="yes"
                    false-value="no"
                    v-model="collection.multiPurpose"
                  />
                </div>
                <div class="checkbox-wrapper">
                  <label
                    for="networked"
                    :class="{
                      'checkbox-visual': collection.networked !== 'yes',
                      'checkbox-visual active': collection.networked === 'yes',
                    }"
                  >
                    <Plus
                      class="plus-icon"
                      v-if="collection.networked !== 'yes'"
                    />
                    <Check class="plus-icon" v-else />
                    networked
                  </label>
                  <input
                    type="checkbox"
                    id="networked"
                    class="checkbox-input"
                    true-value="yes"
                    false-value="no"
                    v-model="collection.networked"
                  />
                </div>
                <div class="checkbox-wrapper">
                  <label
                    for="duplex"
                    :class="{
                      'checkbox-visual': collection.duplex !== 'yes',
                      'checkbox-visual active': collection.duplex === 'yes',
                    }"
                  >
                    <Plus
                      class="plus-icon"
                      v-if="collection.duplex !== 'yes'"
                    />
                    <Check class="plus-icon" v-else />
                    duplex
                  </label>
                  <input
                    type="checkbox"
                    id="duplex"
                    class="checkbox-input"
                    true-value="yes"
                    false-value="no"
                    v-model="collection.duplex"
                  />
                </div>
              </div>
              <div class="entry-control">
                <label for="">Serial Number</label>
                <input
                  type="text"
                  class="entry-input"
                  v-model="collection.serialNumber"
                />
              </div>

              <button v-if="!isLoading" class="add-btn" :disabled="isLoading">
                add
              </button>
              <button v-else class="add-btn" :disabled="isLoading">
                add
                <Loader />
              </button>

              <div class="go-back" @click="pop">
                <ChevronRight />
                <span>Back</span>
              </div>
            </form>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>

<script setup>
import Plus from "vue-material-design-icons/Plus.vue";
import Check from "vue-material-design-icons/Check.vue";
import ChevronRight from "vue-material-design-icons/ChevronRight.vue";

import Loader from "@/components/BtnLoader";
import SelectBox from "@/base/SearchableSelectBx.vue";
import Alert from "@/components/Alert.vue";
import AlertFn from "@/helpers/AlertFn.js";

import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import axios from "axios";

const page = ref(1);

const store = useStore();
const router = useRouter();

const isLoading = ref(false);
const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const machines = ref([]);
const collection = reactive({
  machineId: "",
  model: "HP Laserjet M502",
  cartridge: "37A",
  multiPurpose: false,
  networked: false,
  duplex: false,
  serialNumber: "12345-6789",
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

const next = () => {
  if (!collection.model || collection.model.length < 2) {
    showAlert(true, "Please enter a valid model", "danger");
    removeAlert();
  } else if (!collection.cartridge || collection.cartridge.length < 3) {
    showAlert(true, "Please enter a valid cartridge", "danger");
    removeAlert();
  } else if (!collection.machineId || collection.machineId.length != 24) {
    showAlert(true, "Please select a user", "danger");
    removeAlert();
  } else page.value = 2;
};

const handleSubmit = async () => {
  if (!collection.serialNumber || collection.serialNumber.length < 6) {
    showAlert(true, "Please enter a valid serial number", "danger");
    removeAlert();
  } else {
    try {
      isLoading.value = true;

      const res = await axios.post(
        `/torsk/office_equipment/printer/${collection.machineId}`,
        {
          model: collection.model,
          cartridge: collection.cartridge,
          multiPurpose: collection.multiPurpose,
          networked: collection.networked,
          duplex: collection.duplex,
          serialNumber: collection.serialNumber,
        }
      );

      isLoading.value = false;

      store.dispatch("setShowFlushMessage", {
        state: true,
        action: "added",
        context: `${collection.model} printer`,
      });

      setTimeout(() => {
        store.dispatch("setShowFlushMessage", { state: false });
        router.push("/office-equipment/printers");
      }, 3000);
    } catch (err) {
      isLoading.value = false;
      console.log(err);
      showAlert(true, err.response.data.err, "danger");
      removeAlert();
    }
  }
};

const pop = () => {
  page.value = 1;
};
</script>
