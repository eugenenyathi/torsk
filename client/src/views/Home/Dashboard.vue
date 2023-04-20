<template>
  <Loader v-if="isLoading" />
  <section v-else class="dashboard-container">
    <div class="dashboard-content">
      <DashboardDevices />
      <DashboardOfficeEquip />
      <DashboardNetworking />
      <DashboardGeneral />
      <DashboardAssetState />
    </div>
  </section>
</template>

<script setup>
//TODO redesign the dashboard

import Loader from "@/components/Loader";
//components
import DashboardDevices from "@/components/Dashboard/DashboardDevices.vue";
import DashboardOfficeEquip from "@/components/Dashboard/DashboardOfficeEquip.vue";
import DashboardNetworking from "@/components/Dashboard/DashboardNetworking.vue";
import DashboardGeneral from "@/components/Dashboard/DashboardGeneral.vue";
import DashboardAssetState from "@/components/Dashboard/DashboardAssetState.vue";

import useFetchData from "@/composables/useFetchData";

import { useStore } from "vuex";

const store = useStore();
store.commit("switchHeaderBtn", { showDeleteBtn: false, showEditBtn: false });
store.commit("setGreyOutAction", { specs: false, update: false });
store.commit("closeActionsMenu", false);

const { isLoading, fetchData } = useFetchData();

fetchData("/torsk/dashboard", false);
</script>
