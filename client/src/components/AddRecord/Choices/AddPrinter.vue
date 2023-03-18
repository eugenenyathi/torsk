<template>
  <section class="position-container">
    <div class="add-entry-container">
      <div class="add-entry-content">
        <h2>Add a new printer</h2>
        <form @submit.prevent="handleSubmit()">
          <div class="entry-control">
            <label for="">User</label>
            <input type="text" class="entry-input" placeholder="e.g. DES PA" />
          </div>
          <div class="entry-control">
            <label for="">Model</label>
            <input
              type="text"
              class="entry-input"
              placeholder="e.g. HP LaserJet Pro M454dn"
            />
          </div>
          <div class="entry-control">
            <label for="">Cartridge</label>
            <input type="text" class="entry-input" placeholder="e.g. 26A" />
          </div>

          <div class="checkboxes-control">
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

          <button class="add-btn" :disabled="isLoading">add</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import Plus from "vue-material-design-icons/Plus.vue";
import Check from "vue-material-design-icons/Check.vue";

import { ref, reactive } from "vue";

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

const options = ["87A", "37A", "36A"];
</script>
