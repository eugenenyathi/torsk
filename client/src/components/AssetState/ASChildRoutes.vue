<template>
  <!-- Devices -->
  <ServersTable
    v-if="
      currentRoute === 'faulty-servers' ||
      currentRoute === 'decommissioned-servers'
    "
  />
  <MachinesTable
    v-else-if="
      currentRoute === 'faulty-desktops' ||
      currentRoute === 'faulty-laptops' ||
      currentRoute === 'decommissioned-desktops' ||
      currentRoute === 'decommissioned-laptops'
    "
  />
  <MobileDevicesTable
    v-else-if="
      currentRoute === 'faulty-tablets' ||
      currentRoute === 'faulty-cellphones' ||
      currentRoute === 'decommissioned-tablets' ||
      currentRoute === 'decommissioned-cellphones'
    "
  />
  <UPSTable
    v-else-if="
      currentRoute === 'faulty-ups' || currentRoute === 'decommissioned-ups'
    "
  />

  <!-- Office Equipment -->
  <PrintersTable
    v-else-if="
      currentRoute === 'faulty-printers' ||
      currentRoute === 'decommissioned-printers'
    "
  />
  <ScannersTable
    v-else-if="
      currentRoute === 'faulty-scanners' ||
      currentRoute === 'decommissioned-scanners'
    "
  />

  <!-- Networking Devices -->
  <RoutersTable
    v-else-if="
      currentRoute === 'faulty-routers' ||
      currentRoute === 'decommissioned-routers'
    "
  />
  <SwitchesTable
    v-else-if="
      currentRoute === 'faulty-switches' ||
      currentRoute === 'decommissioned-switches'
    "
  />
  <ConvertersTable
    v-else-if="
      currentRoute === 'faulty-converters' ||
      currentRoute === 'decommissioned-converters'
    "
  />
</template>

<script setup>
import ServersTable from "./Tables/ShowServers.vue";
import MachinesTable from "./Tables/ShowMachines.vue";
import MobileDevicesTable from "./Tables/ShowMobileDevices.vue";
import UPSTable from "./Tables/ShowUPS.vue";
import PrintersTable from "./Tables/ShowPrinters.vue";
import ScannersTable from "./Tables/ShowScanners.vue";
import RoutersTable from "./Tables/ShowRouters.vue";
import SwitchesTable from "./Tables/ShowSwitches.vue";
import ConvertersTable from "./Tables/ShowConverters.vue";

import { useRoute } from "vue-router";
import { computed } from "vue";

const currentRoute = computed(() => useRoute().name.toLowerCase());
</script>
