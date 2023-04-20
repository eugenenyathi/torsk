<template>
  <div>
    <Transition name="fade">
      <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
    </Transition>
    <form @submit.prevent="next()">
      <div class="entry-control">
        <label>Operating system</label>
        <input
          type="text"
          class="entry-input"
          placeholder="e.g. Windows Server 12"
          v-model="collection.os"
        />
      </div>
      <div class="entry-control">
        <label for="">Serves</label>
        <input
          type="text"
          class="entry-input"
          placeholder="e.g. Promun System, SimAcc, etc"
          v-model="collection.serves"
        />
      </div>
      <div class="entry-control">
        <label>Antivirus</label>
        <input
          type="text"
          class="entry-input"
          placeholder="e.g. Eset v9"
          v-model="collection.antivirus"
        />
      </div>
      <button class="add-btn next-btn">continue</button>
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

import { useStore } from "vuex";
import { ref, computed, reactive } from "vue";

const store = useStore();
const emit = defineEmits(["next", "pop"]);

const data = computed(() => store.getters.getTransitFormData);

const collection = reactive({
  os: data.value.os || "Windows Server 2016",
  antivirus: data.value.antivirus || "Eset v10",
  serves: data.value.serves || ["Promun System", " SimAcc System"],
});

const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const next = () => {
  if (!collection.os || collection.os.length < 3) {
    showAlert(true, "Please select your operating system", "danger");
    removeAlert();
  } else if (!collection.antivirus && collection.antivirus.length < 3) {
    showAlert(true, "Please enter valid antivirus", "danger");
    removeAlert();
  } else if (!collection.serves.length > 0) {
    showAlert(true, "The server must be provide some service", "danger");
    removeAlert();
  } else {
    store.dispatch("setTransitFormData", {
      os: collection.os,
      serves: collection.serves,
      antivirus: collection.antivirus,
    });
    emit("next", 4);
  }
};
</script>
