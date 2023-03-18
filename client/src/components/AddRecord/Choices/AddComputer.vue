<template>
  <section class="position-container">
    <div class="add-entry-container">
      <div class="add-entry-content">
        <Specs1 v-if="page === 1" @next="next" />
        <Specs2 v-else @next="next" />
      </div>
    </div>
  </section>
</template>

<script setup>
import Specs1 from "./ComputerSpecs1.vue";
import Specs2 from "./ComputerSpecs2.vue";

import { ref } from "vue";

const page = ref(1);

const next = () => {
  page.value = 2;
};
</script>
