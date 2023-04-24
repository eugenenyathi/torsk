<template>
  <section class="position-container">
    <div class="add-entry-container">
      <div class="add-entry-content">
        <Transition name="switch" mode="out-in">
          <div v-if="page === 1" class="page-wrapper">
            <h2>Add a new device</h2>
            <Transition name="fade">
              <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
            </Transition>
            <form @submit.prevent="next()">
              <div class="entry-control">
                <div class="storage-wrapper">
                  <div class="storage-radio-wrapper">
                    <div class="checkbox-wrapper">
                      <label
                        for="tablet"
                        :class="{
                          'checkbox-visual': collection.deviceType !== 'tablet',
                          'checkbox-visual active':
                            collection.deviceType === 'tablet',
                        }"
                      >
                        <Plus
                          class="plus-icon"
                          v-if="collection.deviceType !== 'tablet'"
                        />
                        <Check
                          class="plus-icon"
                          v-else-if="collection.deviceType === 'tablet'"
                        />

                        Tablet
                      </label>
                      <input
                        type="radio"
                        id="tablet"
                        class="checkbox-input"
                        v-model="collection.deviceType"
                        value="tablet"
                      />
                    </div>
                    <div class="checkbox-wrapper">
                      <label
                        for="cellphone"
                        :class="{
                          'checkbox-visual':
                            collection.deviceType !== 'cellphone',
                          'checkbox-visual active':
                            collection.deviceType === 'cellphone',
                        }"
                      >
                        <Plus
                          class="plus-icon"
                          v-if="collection.deviceType !== 'cellphone'"
                        />
                        <Check
                          class="plus-icon"
                          v-else-if="collection.deviceType === 'cellphone'"
                        />
                        Cellphone
                      </label>
                      <input
                        type="radio"
                        id="cellphone"
                        class="checkbox-input"
                        v-model="collection.deviceType"
                        value="cellphone"
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
                  placeholder="e.g. Town Clerk"
                  v-model="collection.user"
                />
              </div>
              <div class="entry-control">
                <label for="">Model</label>
                <input
                  type="text"
                  class="entry-input"
                  placeholder="e.g. Samsung S22"
                  v-model="collection.model"
                />
              </div>
              <div class="entry-control">
                <label for="">OS</label>
                <input
                  type="text"
                  class="entry-input"
                  placeholder="e.g. Android 14"
                  v-model="collection.os"
                />
              </div>

              <button class="add-btn next-btn">continue</button>
            </form>
          </div>
          <div v-else class="page-wrapper">
            <Transition name="fade">
              <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
            </Transition>
            <form @submit.prevent="handleSubmit()">
              <div class="entry-control">
                <label for="">Storage</label>
                <div class="storage-input-wrapper">
                  <input
                    type="text"
                    class="entry-input"
                    placeholder="e.g. 400"
                    v-model="collection.storage"
                  />
                  <span class="cool-span">GB</span>
                </div>
              </div>
              <div class="entry-control">
                <label for="" class="label-with-span">
                  MAC Address
                  <span class="cool-span">optional</span>
                </label>
                <input
                  type="text"
                  class="entry-input"
                  v-model="collection.macAddress"
                />
              </div>
              <div class="entry-control">
                <label for="">Serial Number</label>
                <input
                  type="text"
                  class="entry-input"
                  v-model="collection.serialNumber"
                />
              </div>
              <div class="entry-control">
                <label for="">IMEI Number</label>
                <input
                  type="text"
                  class="entry-input"
                  v-model="collection.imei"
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
import Alert from "@/components/Alert.vue";
import AlertFn from "@/helpers/AlertFn.js";
import usePushData from "@/composables/usePushData";

import { useStore } from "vuex";
import { ref, reactive, computed, watch } from "vue";

const store = useStore();
const emit = defineEmits(["next"]);

const page = ref(1);

const data = computed(() => store.getters.getTransitFormData);

const collection = reactive({
  deviceType: data.value.deviceType || "cellphone",
  user: data.value.user || "Purchasing Manager",
  model: data.value.model || "Samsung S22 Ultra",
  os: data.value.os || "Android 14",
  storage: data.value.storage || 200,
  macAddress: data.value.macAddress || "e8:03:9a:3a:56:5c",
  serialNumber: data.value.serialNumber || "123456-8942",
  imei: data.value.imei || "123456789102345",
});

const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const next = () => {
  if (!collection.deviceType) {
    showAlert(true, "Please select a device type", "danger");
    removeAlert();
  } else if (!collection.model || collection.model.length < 6) {
    showAlert(true, "Please enter a valid model", "danger");
    removeAlert();
  } else if (!collection.os || collection.os.length < 5) {
    showAlert(true, "Please enter a valid operating system", "danger");
    removeAlert();
  } else {
    store.dispatch("setTransitFormData", {
      deviceType: collection.deviceType,
      user: collection.user,
      model: collection.model,
      os: collection.os,
      storage: collection.storage,
    });
    //go to next page
    page.value = 2;
  }
};

const { isLoading, axiosError, postData } = usePushData();

watch(axiosError, (currentValue, oldValue) => {
  if (currentValue) {
    showAlert(true, currentValue, "danger");
    removeAlert();
  }

  axiosError.value = null;
});

const handleSubmit = async () => {
  if (!collection.storage) {
    showAlert(true, "Please enter valid storage gigs", "danger");
    removeAlert();
  } else if (!collection.serialNumber || collection.serialNumber.length < 3) {
    showAlert(true, "Please enter a valid desktop serial number", "danger");
    removeAlert();
  } else if (!collection.imei || collection.imei.length !== 15) {
    showAlert(true, "Please enter a valid imei ", "danger");
    removeAlert();
  } else {
    store.dispatch(
      "setFlushMessageContext",
      `${data.value.user} ${data.value.deviceType} `
    );
    store.dispatch("setTransitFormData", {
      macAddress: collection.macAddress,
      serialNumber: collection.serialNumber,
      imei: collection.imei,
    });

    await postData(
      `/devices/${data.value.deviceType}s`,
      `/torsk/devices/mobile/${data.value.deviceType}`
    );
  }
};

const pop = () => {
  page.value = 1;
};
</script>
