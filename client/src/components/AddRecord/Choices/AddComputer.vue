<template>
  <section class="position-container">
    <div class="add-entry-container">
      <div class="add-entry-content">
        <Transition name="switch" mode="out-in">
          <Specs1 v-if="page === 1" @next="next" />
          <Specs2 v-else-if="page === 2" @pop="pop" @next="next" />
          <Specs3 v-else @pop="pop" @next="next" />
        </Transition>
      </div>
    </div>
  </section>
</template>

<script setup>
import Specs1 from "./ComputerSpecs1.vue";
import Specs2 from "./ComputerSpecs2.vue";
import Specs3 from "./ComputerSpecs3.vue";

import { ref } from "vue";

//TODO add office and anti-virus field + alert in each spec + add the same fields to the updates & specs area

const page = ref(1);

const next = (targetPage) => {
  page.value = targetPage;
};

const pop = (targetPage) => {
  page.value = targetPage;
};
</script>
