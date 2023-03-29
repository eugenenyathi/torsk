<template>
  <div>
    <h2>Let's finish up</h2>
    <Transition name="fade">
      <Alert v-if="alert.show" :msg="alert.msg" :type="alert.type" />
    </Transition>
    <form @submit.prevent="handleSubmit()">
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

      <button v-if="!isLoading" class="add-btn" :disabled="isLoading">
        add
      </button>
      <button v-else class="add-btn" :disabled="isLoading">
        add
        <Loader />
      </button>

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
import { ref, reactive } from "vue";

const store = useStore();
const emit = defineEmits(["pop"]);

const collection = reactive({
  office: "Office 2019",
  antivirus: "Eset v10",
});

const isLoading = ref(false);
const alert = reactive({ show: false, msg: "", type: "" });
const { showAlert, removeAlert } = AlertFn(alert);

const handleSubmit = () => {
  if (!collection.office && collection.office.length < 9) {
    showAlert(true, "Please enter a valid Office", "danger");
    removeAlert();
  }
  if (!collection.antivirus && collection.antivirus.length < 3) {
    showAlert(true, "Please enter valid antivirus", "danger");
    removeAlert();
  } else {
    showAlert(true, "finito", "success");
    removeAlert();
  }
};
</script>
