<template>
  <section class="filter-list-container">
    <div class="filter-list-content">
      <h2>Search by {{ searchContext }}</h2>
      <form @submit.prevent="$emit('search')">
        <div class="filter-control">
          <!-- <Cancel class="clear-icon" @click="$emit('clear')" /> -->
          <input
            type="text"
            class="filter-input"
            placeholder="Let's go "
            @input="$emit('update:modelValue', $event.target.value)"
          />
          <Search class="search-icon" @click="$emit('search')" />
        </div>
      </form>
      <Close class="search-icon close-icon" @click="$emit('close')" />
    </div>
  </section>
</template>

<script setup>
import Search from "vue-material-design-icons/Magnify.vue";
import Close from "vue-material-design-icons/Close.vue";
import Cancel from "vue-material-design-icons/Cancel.vue";

import { ref } from "vue";

const props = defineProps({ modelValue: String, searchContext: String });
</script>
