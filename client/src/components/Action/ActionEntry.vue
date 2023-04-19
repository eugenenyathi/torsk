<template>
  <ActionServer
    v-if="currentRoute === 'Servers'"
    :action="action"
    context="server"
  />

  <ActionMachine
    v-else-if="currentRoute === 'Desktops' || currentRoute === 'Laptops'"
    :action="action"
    context="machine"
  />

  <ActionUPS
    v-else-if="currentRoute === 'UPSuppliers'"
    :action="action"
    context="ups"
  />

  <ActionMobile
    v-else-if="currentRoute === 'Tablets' || currentRoute === 'Cellphones'"
    :action="action"
    :context="context"
  />

  <ActionPrinter
    v-else-if="currentRoute === 'Printers'"
    :action="action"
    context="printer"
  />
  <ActionScanner
    v-else-if="currentRoute === 'Scanners'"
    :action="action"
    context="scanner"
  />
  <ActionRouter
    v-else-if="currentRoute === 'Routers'"
    :action="action"
    context="router"
  />
  <ActionSwitch
    v-else-if="currentRoute === 'Switches'"
    :action="action"
    context="switch"
  />
  <ActionConverter
    v-else-if="currentRoute === 'Converters'"
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

const currentRoute = computed(() => useRoute().name);

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
