<template>
  <div>
    <Transition name="fade">
      <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
    </Transition>
    <form @submit.prevent="next()">
      <div class="entry-control">
        <label for="">Office</label>
        <input
          type="text"
          class="entry-input"
          placeholder="e.g. Office 2013"
          v-model="collection.office"
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
  office: data.value.office || "Office 2021",
  antivirus: data.value.antivirus || "Eset v10",
});

const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const next = () => {
  if (!collection.office && collection.office.length < 9) {
    showAlert(true, "Please enter a valid Office", "danger");
    removeAlert();
  } else if (!collection.antivirus && collection.antivirus.length < 3) {
    showAlert(true, "Please enter valid antivirus", "danger");
    removeAlert();
  } else {
    store.dispatch("setTransitFormData", {
      office: collection.office,
      antivirus: collection.antivirus,
    });
    emit("next", 4);
  }
};
</script>
