<template>
  <section v-if="action === 'update'" class="update-container action-info">
    <form class="update-content" @submit.prevent="handleSubmit">
      <div class="update-control">
        <BaseInput
          class="update-input"
          label="User"
          v-model="model"
          :value="data.user"
        />
      </div>
      <div class="update-control">
        <label for="">Model</label>
        <input type="text" class="update-input" :value="data.name" />
      </div>

      <div class="entry-control">
        <label for="">Cartridge</label>
        <input type="text" class="update-input" :value="data.catridge" />
      </div>

      <div class="checkboxes-control action-printer">
        <div class="checkbox-wrapper">
          <label
            for="multi-purpose"
            :class="{
              'checkbox-visual': multiPurpose !== 'yes',
              'checkbox-visual active': multiPurpose === 'yes',
            }"
          >
            <Plus class="plus-icon" v-if="multiPurpose !== 'yes'" />
            <Check class="plus-icon" v-else />

            multi-purpose
          </label>
          <input
            type="checkbox"
            id="multi-purpose"
            class="checkbox-input"
            true-value="yes"
            false-value="no"
            v-model="multiPurpose"
          />
        </div>
        <div class="checkbox-wrapper">
          <label
            for="networked"
            :class="{
              'checkbox-visual': networked !== 'yes',
              'checkbox-visual active': networked === 'yes',
            }"
          >
            <Plus class="plus-icon" v-if="networked !== 'yes'" />
            <Check class="plus-icon" v-else />
            networked
          </label>
          <input
            type="checkbox"
            id="networked"
            class="checkbox-input"
            true-value="yes"
            false-value="no"
            v-model="networked"
          />
        </div>
        <div class="checkbox-wrapper">
          <label
            for="duplex"
            :class="{
              'checkbox-visual': duplex !== 'yes',
              'checkbox-visual active': duplex === 'yes',
            }"
          >
            <Plus class="plus-icon" v-if="duplex !== 'yes'" />
            <Check class="plus-icon" v-else />
            duplex
          </label>
          <input
            type="checkbox"
            id="duplex"
            class="checkbox-input"
            true-value="yes"
            false-value="no"
            v-model="duplex"
          />
        </div>
      </div>

      <button class="update-btn" :disabled="isLoading">update</button>
    </form>
  </section>
  <State v-else :action="action" :context="context" />
</template>

<script setup>
import BaseInput from "../../base/BaseInput.vue";
import Plus from "vue-material-design-icons/Plus.vue";
import Check from "vue-material-design-icons/Check.vue";

import State from "./ActionState";

import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  action: String,
  context: String,
});

const store = useStore();
const data = computed(() => store.getters.getTransitData);

const multiPurpose = ref(false);
const duplex = ref(false);
const networked = ref(false);
const active = reactive({
  multiPurpose: false,
  networked: false,
  duplex: false,
});

const selection = (selected) => {
  switch (selected) {
    case "multi-purpose":
      multiPurpose.value = !multiPurpose.value;
      break;
    case "networked":
      networked.value = !networked.value;
      break;
    case "duplex":
      duplex.value = !duplex.value;
      break;
  }
};
</script>
