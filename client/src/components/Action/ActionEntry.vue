<template>
  <ActionServer
    v-if="
      currentRoute === 'servers' ||
      currentRoute === 'faulty-servers' ||
      currentRoute === 'decommissioned-servers'
    "
    :action="action"
    context="server"
  />

  <ActionMachine
    v-else-if="
      currentRoute === 'desktops' ||
      currentRoute === 'laptops' ||
      currentRoute === 'faulty-desktops' ||
      currentRoute === 'faulty-laptops' ||
      currentRoute === 'decommissioned-desktops' ||
      currentRoute === 'decommissioned-laptops'
    "
    :action="action"
    context="machine"
  />

  <ActionUPS
    v-else-if="
      currentRoute === 'upsuppliers' ||
      currentRoute === 'faulty-ups' ||
      currentRoute === 'decommissioned-ups'
    "
    :action="action"
    context="ups"
  />

  <ActionMobile
    v-else-if="
      currentRoute === 'tablets' ||
      currentRoute === 'cellphones' ||
      currentRoute === 'faulty-tablets' ||
      currentRoute === 'faulty-cellphones' ||
      currentRoute === 'decommissioned-tablets' ||
      currentRoute === 'decommissioned-cellphones'
    "
    :action="action"
    :context="context"
  />

  <ActionPrinter
    v-else-if="
      currentRoute === 'printers' ||
      currentRoute === 'faulty-printers' ||
      currentRoute === 'decommissioned-printers'
    "
    :action="action"
    context="printer"
  />
  <ActionScanner
    v-else-if="
      currentRoute === 'scanners' ||
      currentRoute === 'faulty-scanners' ||
      currentRoute === 'decommissioned-scanners'
    "
    :action="action"
    context="scanner"
  />
  <ActionRouter
    v-else-if="
      currentRoute === 'routers' ||
      currentRoute === 'faulty-routers' ||
      currentRoute === 'decommissioned-routers'
    "
    :action="action"
    context="router"
  />
  <ActionSwitch
    v-else-if="
      currentRoute === 'switches' ||
      currentRoute === 'faulty-switches' ||
      currentRoute === 'decommissioned-switches'
    "
    :action="action"
    context="switch"
  />
  <ActionConverter
    v-else-if="
      currentRoute === 'converters' ||
      currentRoute === 'faulty-converters' ||
      currentRoute === 'decommissioned-converters'
    "
    :action="action"
    context="converter"
  />
  <ActionWiFi v-else :action="action" context="wifi" />
</template>

<script setup>
import ActionServer from "./ActionServer";
import ActionMachine from "./ActionMachine";
import ActionUPS from "./ActionUPS";
import ActionMobile from "./ActionMobile";
import ActionPrinter from "./ActionPrinter";
import ActionScanner from "./ActionScanner";
import ActionRouter from "./ActionRouter";
import ActionSwitch from "./ActionSwitch";
import ActionConverter from "./ActionConverter";
import ActionWiFi from "./ActionWiFi";

import { useRoute } from "vue-router";
import { ref, computed } from "vue";

const currentRoute = computed(() => useRoute().name.toLowerCase());
console.log("CurrentRoute: ", currentRoute.value);

const context = ref("");

if (currentRoute.value === "Tablets") {
  context.value = "tablet";
} else if (currentRoute.value === "Cellphones") {
  context.value = "cellphone";
}

const props = defineProps({
  action: String,
});
</script>
