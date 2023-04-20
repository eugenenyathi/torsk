<template>
  <section class="position-container">
    <div class="add-entry-container">
      <div class="add-entry-content">
        <Transition name="switch" mode="out-in">
          <div v-if="page === 1">
            <h2>Update {{ data.user }}'s Line</h2>
            <Transition name="fade">
              <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
            </Transition>
            <form @submit.prevent="next()">
              <div class="entry-control">
                <label for="">User</label>
                <input
                  type="text"
                  class="entry-input"
                  placeholder="e.g. IT Technician"
                  v-model="collection.user"
                />
              </div>
              <div class="entry-control">
                <label for="">Extension</label>
                <input
                  type="number"
                  class="entry-input"
                  placeholder="e.g. 2209"
                  v-model="collection.extension"
                />
              </div>

              <div class="entry-control">
                <label for="">Direct Line</label>
                <input
                  type="number"
                  class="entry-input"
                  placeholder="e.g. 2680000"
                  v-model="collection.directLine"
                />
              </div>

              <button class="add-btn next-btn">continue</button>
            </form>
          </div>
          <div v-else>
            <Transition name="fade">
              <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
            </Transition>
            <form @submit.prevent="handleSubmit">
              <div class="entry-control">
                <label for="">Model</label>
                <input
                  type="text"
                  class="entry-input"
                  placeholder="e.g. NEC"
                  v-model="collection.model"
                />
              </div>

              <div class="entry-control">
                <label for="">Serial Number</label>
                <input
                  type="text"
                  class="entry-input"
                  placeholder="e.g. NEC"
                  v-model="collection.serialNumber"
                />
              </div>

              <button
                v-if="!isLoading"
                class="add-btn update-btn"
                :disabled="isLoading"
              >
                update
              </button>
              <button v-else class="add-btn update-btn" :disabled="isLoading">
                update
                <Loader />
              </button>

              <div class="go-back" @click="pop()">
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
import ChevronRight from "vue-material-design-icons/ChevronRight.vue";

import Loader from "@/components/BtnLoader";
import Alert from "@/components/Alert.vue";
import AlertFn from "@/helpers/AlertFn.js";

import usePushData from "@/composables/usePushData";

import { ref, reactive, computed, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();

const page = ref(1);

const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const data = computed(() => store.getters.getTransitData);
const formData = computed(() => store.getters.getTransitFormData);

const collection = reactive({
  user: formData.value.user || data.value.user,
  model: formData.value.model || data.value.model,
  extension: formData.value.extension || data.value.extension,
  directLine: formData.value.directLine || data.value.directLine,
  serialNumber: formData.value.serialNumber || data.value.serialNumber,
});

const next = () => {
  if (!collection.user) {
    showAlert(true, "User field is empty", "danger");
    removeAlert();
  } else if (!collection.extension) {
    showAlert(true, "Please enter a valid extension", "danger");
    removeAlert();
  } else if (!collection.directLine) {
    showAlert(true, "Please enter a valid direct line", "danger");
    removeAlert();
  } else {
    store.dispatch("setTransitFormData", {
      user: collection.user,
      extension: collection.extension,
      directLine: collection.directLine,
    });

    page.value = 2;
  }
};

const { isLoading, axiosError, putData } = usePushData();

watch(axiosError, (currentValue, oldValue) => {
  if (currentValue) {
    showAlert(true, currentValue, "danger");
    removeAlert();
  }

  axiosError.value = null;
});

const handleSubmit = async () => {
  if (!collection.model || collection.model.length < 3) {
    showAlert(true, "Please enter a valid model", "danger");
    removeAlert();
  } else if (!collection.serialNumber || collection.serialNumber.length < 3) {
    showAlert(true, "Please enter a valid desktop serial number", "danger");
    removeAlert();
  } else {
    store.dispatch(
      "setFlushMessageContext",
      `${collection.user} telephone line`
    );
    store.dispatch("setTransitFormData", {
      model: collection.model,
      serialNumber: collection.serialNumber,
    });

    await putData(`/torsk/telephone/${data.value._id}`, "/telephones");
  }
};

const pop = () => {
  page.value = 1;
};
</script>
