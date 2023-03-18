<template>
  <section class="position-container">
    <div class="add-entry-container">
      <div class="add-entry-content">
        <div v-if="page === 1">
          <h2>Add a new router</h2>
          <form @submit.prevent="subSubmit()">
            <div class="entry-control">
              <label for="">Model</label>
              <input
                type="text"
                class="entry-input"
                placeholder="e.g. Trendnet N300"
              />
            </div>
            <div class="entry-control">
              <label for="">Location</label>
              <input
                type="text"
                class="entry-input"
                placeholder="e.g. server room"
              />
            </div>
            <div class="entry-control">
              <label for="">IP Address</label>
              <input type="text" class="entry-input" />
            </div>

            <button class="add-btn" :disabled="isLoading">add</button>
          </form>
        </div>
        <div v-else>
          <h2>Let's finish up</h2>
          <form @submit.prevent="handleSubmit()">
            <div class="entry-control">
              <label for="">Ports</label>
              <input type="number" class="entry-input" />
            </div>
            <div class="entry-control">
              <label for="">Dead ports</label>
              <input type="number" class="entry-input" />
            </div>
            <div class="entry-control">
              <div class="checkbox-wrapper wireless">
                <label
                  for="wireless"
                  :class="{
                    'checkbox-visual': !collection.wireless,
                    'checkbox-visual active': collection.wireless,
                  }"
                >
                  <Plus class="plus-icon" v-if="!collection.wireless" />
                  <Check class="plus-icon" v-else />

                  Wireless
                </label>
                <input
                  type="radio"
                  id="wireless"
                  class="checkbox-input"
                  v-model="collection.wireless"
                  :value="!collection.wireless"
                />
              </div>
            </div>

            <button class="add-btn" :disabled="isLoading">save</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Plus from "vue-material-design-icons/Plus.vue";
import Check from "vue-material-design-icons/Check.vue";

import { ref, reactive } from "vue";

const page = ref(1);
const collection = reactive({ wireless: false });

const subSubmit = () => {
  page.value = 2;
};
</script>
