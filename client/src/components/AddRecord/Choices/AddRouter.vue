<template>
  <section class="position-container">
    <div class="add-entry-container">
      <div class="add-entry-content">
        <Transition name="switch" mode="out-in">
          <div v-if="page === 1">
            <h2>Add a new router</h2>
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
                <label for="">Model</label>
                <input
                  type="text"
                  class="entry-input"
                  placeholder="e.g. Trendnet N300"
                  v-model="collection.model"
                />
              </div>

              <div class="entry-control">
                <label for="">IP Address</label>
                <input
                  type="text"
                  class="entry-input"
                  v-model="collection.ipAddress"
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
              <div class="entry-control">
                <label for="">Serial Number</label>
                <input
                  type="text"
                  class="entry-input"
                  v-model="collection.serialNumber"
                />
              </div>
              <div class="entry-control">
                <label for="">Ports</label>
                <input
                  type="number"
                  class="entry-input"
                  v-model="collection.ports"
                />
              </div>
              <div class="entry-control">
                <label for="">Dead ports</label>
                <input
                  type="number"
                  class="entry-input"
                  v-model="collection.deadPorts"
                />
              </div>
              <div class="entry-control">
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

              <button v-if="!isLoading" class="add-btn" :disabled="isLoading">
                add
              </button>
              <button v-else class="add-btn" :disabled="isLoading">
                add
                <Loader />
              </button>
              <div class="go-back add" @click="pop()">
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

import Loader from "../../BtnLoader";
import Alert from "../../Alert.vue";
import AlertFn from "../../../helpers/AlertFn.js";

import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import axios from "axios";

const page = ref(1);

const store = useStore();
const router = useRouter();

const isLoading = ref(false);
const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const collection = reactive({
  location: "Accounts",
  model: "trendnet",
  ipAddress: "192.168.1.23",
  serialNumber: "12354-5689",
  ports: 8,
  deadPorts: 0,
  wireless: false,
});

const next = async () => {
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
    showAlert(true, "Please enter a valid ip address", "danger");
    removeAlert();
  } else {
    page.value = 2;
  }
};

const handleSubmit = async () => {
  if (!collection.serialNumber || collection.serialNumber.length < 6) {
    showAlert(true, "Please enter a valid serial number", "danger");
    removeAlert();
  } else if (
    !collection.ports ||
    collection.ports < 6 ||
    collection.ports % 2 !== 0
  ) {
    showAlert(true, "The ports field can not be empty", "danger");
    removeAlert();
  } else {
    try {
      isLoading.value = true;

      const res = await axios.post("/torsk/networking/router", {
        location: collection.location,
        model: collection.model,
        ipAddress: collection.ipAddress,
        serialNumber: collection.serialNumber,
        ports: collection.ports,
        deadPorts: collection.deadPorts,
        wireless: collection.wireless,
      });

      isLoading.value = false;

      store.dispatch("setShowFlushMessage", {
        state: true,
        action: "added",
        context: `${collection.location} router`,
      });

      setTimeout(() => {
        store.commit("closeActionsMenu", false);
        store.dispatch("setShowFlushMessage", { state: false });
        router.push("/networking/routers");
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
