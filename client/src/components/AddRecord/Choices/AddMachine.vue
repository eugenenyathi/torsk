<template>
  <section class="position-container">
    <div class="add-entry-container">
      <div class="add-entry-content">
        <Transition name="switch" mode="out-in">
          <Page1 v-if="page === 1" @next="next" />
          <Page2 v-else-if="page === 2" @pop="pop" @next="next" />
          <Page3 v-else-if="page === 3" @pop="pop" @next="next" />
          <Page4 v-else-if="page === 4" @pop="pop" @next="next" />
          <Page5 v-else @pop="pop" />
        </Transition>
      </div>
    </div>
  </section>
</template>

<script setup>
import Page1 from "./AddMachinePgOne.vue";
import Page2 from "./AddMachinePgTwo.vue";
import Page3 from "./AddMachinePgThree.vue";
import Page4 from "./AddMachinePgFour.vue";
import Page5 from "./AddMachinePgFive.vue";

import { ref } from "vue";

const page = ref(1);

const next = (targetPage) => {
  page.value = targetPage;
};

const pop = (targetPage) => {
  page.value = targetPage;
};
</script>
