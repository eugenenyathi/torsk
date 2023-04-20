<template>
  <h2>General</h2>
  <div class="segment-wrapper">
    <router-link to="/telephones" class="card">
      <div class="icon-container">
        <Phone class="card-icon" />
      </div>
      <p class="statistic">{{ data.extensions }}</p>
      <p class="category">Extensions</p>
    </router-link>
    <router-link to="/telephones" class="card">
      <div class="icon-container">
        <Phone class="card-icon" />
      </div>
      <p class="statistic">{{ data.directLines }}</p>
      <p class="category">Direct Lines</p>
    </router-link>
    <router-link to="/emails/list" class="card">
      <div class="icon-container">
        <Email class="card-icon" />
      </div>
      <p class="statistic">{{ data.emails }}</p>
      <p class="category">Emails</p>
    </router-link>
  </div>
</template>

<script setup>
import Phone from "vue-material-design-icons/PhoneOutline.vue";
import Email from "vue-material-design-icons/EmailOutline.vue";

import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const data = computed(() => store.getters.getDbData);
</script>
