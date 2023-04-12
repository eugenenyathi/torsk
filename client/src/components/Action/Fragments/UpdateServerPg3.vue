<template>
  <div>
    <Transition name="fade">
      <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
    </Transition>
    <form @submit.prevent="next()">
      <div class="update-control">
        <label for="">Serves</label>
        <input type="text" class="update-input" v-model="collection.serves" />
      </div>
      <div class="update-control">
        <label>Antivirus</label>
        <input
          type="text"
          class="update-input"
          v-model="collection.antivirus"
        />
      </div>
      <div class="update-control">
        <label for="">IP Address</label>
        <input
          type="text"
          class="update-input"
          v-model="collection.ipAddress"
        />
      </div>
      <button class="update-btn">continue</button>
      <div class="go-back" @click="$emit('pop', 2)">
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
import validate from "ip-validator";

import { useStore } from "vuex";
import { ref, computed, reactive } from "vue";

const store = useStore();
const emit = defineEmits(["next", "pop"]);

const data = computed(() => store.getters.getTransitData);
const formData = computed(() => store.getters.getTransitFormData);

const collection = reactive({
  serves: formData.value.serves || data.value.serves,
  antivirus: formData.value.antivirus || data.value.antivirus,
  ipAddress: formData.value.ipAddress || data.value.ipAddress,
});

const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const next = () => {
  if (!collection.serves.length > 0) {
    showAlert(true, "The server must be provide some service", "danger");
    removeAlert();
  } else if (!collection.antivirus && collection.antivirus.length < 3) {
    showAlert(true, "Please enter valid antivirus", "danger");
    removeAlert();
  } else if (!collection.ipAddress || !validate.ipv4(collection.ipAddress)) {
    showAlert(true, "Please enter a valid ip address", "danger");
    removeAlert();
  } else {
    store.dispatch("setTransitFormData", {
      serves: collection.serves,
      antivirus: collection.antivirus,
      ipAddress: collection.ipAddress,
    });
    emit("next", 4);
  }
};
</script>
