<template>
  <div>
    <Transition name="fade">
      <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
    </Transition>
    <form @submit.prevent="next()">
      <div class="update-control">
        <label for="" class="label-with-span">
          User Account Password
          <span class="cool-span">optional</span>
        </label>
        <input
          type="text"
          class="update-input"
          v-model="collection.userAccPassword"
        />
      </div>
      <div class="update-control">
        <label for="" class="label-with-span">
          Static ipAddress
          <span class="cool-span">optional</span>
        </label>
        <input
          type="text"
          class="update-input"
          v-model="collection.staticIpAddress"
        />
      </div>

      <button class="update-btn next-btn">continue</button>

      <div class="go-back" @click="$emit('pop', 3)">
        <ChevronRight />
        <span>Back</span>
      </div>
    </form>
  </div>
</template>

<script setup>
import ChevronRight from "vue-material-design-icons/ChevronRight.vue";
import Alert from "@/components/Alert.vue";
import AlertFn from "@/helpers/AlertFn.js";
import ipValidator from "@/helpers/ipValidator.js";

import { useStore } from "vuex";
import { computed, reactive } from "vue";

const store = useStore();
const emit = defineEmits(["next", "pop"]);

const data = computed(() => store.getters.getTransitFormData);

const collection = reactive({
  userAccPassword: data.value.userAccPassword || "password123.",
  staticIpAddress: data.value.staticIpAddress || "192.166.1.72",
});

const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const next = () => {
  if (collection.userAccPassword && collection.userAccPassword.length < 3) {
    showAlert(true, "Please enter a valid user account password", "danger");
    removeAlert();
  } else if (
    !collection.staticIpAddress ||
    !ipValidator(collection.staticIpAddress)
  ) {
    showAlert(true, "Please enter a valid ip address", "danger");
    removeAlert();
  } else {
    store.dispatch("setTransitFormData", {
      userAccPassword: collection.userAccPassword,
      staticIpAddress: collection.staticIpAddress,
    });
    emit("next", 5);
  }
};
</script>
