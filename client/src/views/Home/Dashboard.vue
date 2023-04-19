<template>
  <section class="dashboard-container">
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
//components
import DashboardDevices from "@/components/Dashboard/DashboardDevices.vue";
import DashboardOfficeEquip from "@/components/Dashboard/DashboardOfficeEquip.vue";
import DashboardNetworking from "@/components/Dashboard/DashboardNetworking.vue";
import DashboardGeneral from "@/components/Dashboard/DashboardGeneral.vue";
import DashboardAssetState from "@/components/Dashboard/DashboardAssetState.vue";

import { useStore } from "vuex";

import axios from "axios";

//TODO add a loader

const store = useStore();
store.commit("setShowDeleteBtn", false);
store.commit("closeActionsMenu", false);
store.commit("setGreyOutAction", { specs: false });

//fetch the data
const fetchStats = async () => {
  try {
    const { data } = await axios("/torsk/dashboard");
    //add to the global state
    store.dispatch("setDashboardData", data);
  } catch (err) {
    console.log(err);
  }
};

fetchStats();
</script>
