<template>
  <section class="update-container action-info">
    <div class="update-content">
      <Transition name="switch" mode="out-in">
        <UpdatePageOne v-if="page === 1" @next="next" />
        <UpdatePageTwo v-else @pop="pop" />
      </Transition>
    </div>
  </section>
</template>

<script setup>
import UpdatePageOne from "@/components/Action/Fragments/UpdateMobilePg1";
import UpdatePageTwo from "@/components/Action/Fragments/UpdateMobilePg2";

import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

store.dispatch("flushTransitFormData", {});

const page = ref(1);

const next = (targetPage) => {
  page.value = targetPage;
};

const pop = (targetPage) => {
  page.value = targetPage;
};
</script>
