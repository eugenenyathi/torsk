<template>
  <section class="update-container action-info">
    <div class="update-content">
      <Transition name="switch" mode="out-in">
        <UpdatePageOne v-if="page === 1" @next="next" />
        <UpdatePageTwo v-else-if="page === 2" @pop="pop" @next="next" />
        <UpdatePageThree v-else-if="page === 3" @pop="pop" @next="next" />
        <UpdatePageFour v-else @pop="pop" />
      </Transition>
    </div>
  </section>
</template>

<script setup>
import UpdatePageOne from "@/components/Action/Fragments/UpdateServerPg1";
import UpdatePageTwo from "@/components/Action/Fragments/UpdateMachinePg2";
import UpdatePageThree from "@/components/Action/Fragments/UpdateServerPg3";
import UpdatePageFour from "@/components/Action/Fragments/UpdateServerPg4";

import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

store.dispatch("flushTransitFormData");

const page = ref(1);

const next = (targetPage) => {
  page.value = targetPage;
};

const pop = (targetPage) => {
  page.value = targetPage;
};
</script>
