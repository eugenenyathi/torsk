<template>
  <section class="user-settings-wrapper position-container">
    <div class="user-settings-content">
      <h1 class="heading">Account Security</h1>
      <UserCurrentPassword v-if="page === 1" @next="next" />
      <UserNewPassword v-else @pop="pop" />
    </div>
  </section>
</template>

<script setup>
import UserCurrentPassword from "../../components/UserCurrentPwd.vue";
import UserNewPassword from "../../components/UserNewPwd.vue";

import { ref } from "vue";

const page = ref(1);

const next = () => (page.value = 2);
const pop = () => (page.value = 1);
</script>
