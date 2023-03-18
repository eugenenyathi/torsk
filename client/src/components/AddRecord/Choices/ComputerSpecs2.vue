<template>
  <h2>Let's finish up</h2>
  <form @submit.prevent="handleSubmit()">
    <div class="entry-control">
      <label for="">Storage</label>
      <div class="storage-wrapper">
        <div class="storage-radio-wrapper">
          <div class="checkbox-wrapper">
            <label
              for="multi-purpose"
              :class="{
                'checkbox-visual': storage !== 'hdd',
                'checkbox-visual active': storage === 'hdd',
              }"
            >
              <Plus class="plus-icon" v-if="storage !== 'hdd'" />
              <Check class="plus-icon" v-else-if="storage === 'hdd'" />

              HDD
            </label>
            <input
              type="radio"
              id="multi-purpose"
              class="checkbox-input"
              v-model="storage"
              value="hdd"
            />
          </div>
          <div class="checkbox-wrapper">
            <label
              for="networked"
              :class="{
                'checkbox-visual': storage !== 'ssd',
                'checkbox-visual active': storage === 'ssd',
              }"
            >
              <Plus class="plus-icon" v-if="storage !== 'ssd'" />
              <Check class="plus-icon" v-else-if="storage === 'ssd'" />
              SSD
            </label>
            <input
              type="radio"
              id="networked"
              class="checkbox-input"
              v-model="storage"
              value="ssd"
            />
          </div>
        </div>
        <div class="storage-input-wrapper">
          <input type="text" class="entry-input" placeholder="e.g. 400" />
          <span class="cool-span">GB</span>
        </div>
      </div>
    </div>
    <div class="entry-control">
      <label for="">MAC Address</label>
      <input type="text" class="entry-input" />
    </div>
    <div class="entry-control">
      <label>Desktop Serial Number</label>
      <input type="text" class="entry-input" />
    </div>
    <div class="entry-control">
      <label>Monitor Serial Number</label>
      <input type="text" class="entry-input" />
    </div>

    <button class="add-btn" :disabled="isLoading">Save</button>
  </form>
</template>

<script setup>
import Plus from "vue-material-design-icons/Plus.vue";
import Check from "vue-material-design-icons/Check.vue";

import { ref, reactive } from "vue";

const storage = ref("");

const emit = defineEmits(["next"]);

const handleSubmit = () => {
  emit("next");
};
</script>
