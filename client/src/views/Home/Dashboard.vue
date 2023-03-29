<template>
  <section class="dashboard-container">
    <div class="dashboard-content">
      <DashboardDevices />
      <DashboardOfficeEquip />
      <DashboardNetworking />
      <DashboardGeneral />
    </div>
  </section>
</template>

<script setup>
//components
import DashboardDevices from "../../components/DashboardDevices.vue";
import DashboardOfficeEquip from "../../components/DashboardOfficeEquip.vue";
import DashboardNetworking from "../../components/DashboardNetworking.vue";
import DashboardGeneral from "../../components/DashboardGeneral.vue";

import { useStore } from "vuex";

const store = useStore();
store.commit("setShowDeleteBtn", false);
store.commit("closeActionsMenu", false);
store.commit("setGreyOutAction", false);
</script>
