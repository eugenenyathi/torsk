<template>
  <Sidebar />
  <TopHeader />
  <router-view v-slot="{ Component }">
    <Transition name="route" mode="out-in">
      <component :is="Component"></component>
    </Transition>
  </router-view>
  <Actions />
</template>

<script setup>
import Sidebar from "../components/Sidebar.vue";
import TopHeader from "../components/Header.vue";
import Actions from "../components/Actions.vue";
</script>
