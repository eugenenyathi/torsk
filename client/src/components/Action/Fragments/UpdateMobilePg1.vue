<template>
  <div>
    <Transition name="fade">
      <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
    </Transition>
    <form @submit.prevent="next()">
      <div class="update-control">
        <label for="">User</label>
        <input type="text" class="update-input" v-model="collection.user" />
      </div>
      <div class="update-control">
        <label for="">Model</label>
        <input type="text" class="update-input" v-model="collection.model" />
      </div>
      <div class="update-control">
        <label for="">OS</label>
        <input type="text" class="update-input" v-model="collection.os" />
      </div>
      <div class="update-control">
        <label for="">Storage</label>
        <div class="storage-input-wrapper">
          <input
            type="number"
            class="update-input"
            v-model="collection.storage"
          />
          <span class="cool-span">GB</span>
        </div>
      </div>

      <button class="update-btn next-btn">continue</button>
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

const data = computed(() => store.getters.getTransitData);
const formData = computed(() => store.getters.getTransitFormData);

const collection = reactive({
  deviceType: data.value.deviceType,
  user: formData.value.user || data.value.user,
  model: formData.value.model || data.value.model,
  os: formData.value.os || data.value.os,
  storage: formData.value.storage || data.value.storage,
});

const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const next = () => {
  if (!collection.user || collection.user.length < 3) {
    showAlert(true, "Please enter a valid user", "danger");
    removeAlert();
  } else if (!collection.model || collection.model.length < 6) {
    showAlert(true, "Please enter a valid model", "danger");
    removeAlert();
  } else if (!collection.os || collection.os.length < 5) {
    showAlert(true, "Please enter valid operating system", "danger");
    removeAlert();
  } else if (!collection.storage) {
    showAlert(true, "Please enter valid storage gigs", "danger");
    removeAlert();
  } else {
    store.dispatch("setTransitFormData", {
      deviceType: collection.deviceType,
      user: collection.user,
      model: collection.model,
      os: collection.os,
      storage: collection.storage,
    });
    emit("next", 2);
  }
};
</script>
