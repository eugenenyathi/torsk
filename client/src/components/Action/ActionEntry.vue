<template>
  <ActionMachine
    v-if="currentRoute === 'Desktops' || currentRoute === 'Laptops'"
    :action="action"
    context="machine"
  />
  <ActionMobile
    v-if="currentRoute === 'Tablets' || currentRoute === 'Cellphones'"
    :action="action"
    :context="context"
  />
  <ActionPrinter
    v-if="currentRoute === 'Printers'"
    :action="action"
    context="printer"
  />
  <ActionScanner
    v-if="currentRoute === 'Scanners'"
    :action="action"
    context="scanner"
  />
  <ActionRouter
    v-if="currentRoute === 'Routers'"
    :action="action"
    context="router"
  />
  <ActionSwitch
    v-if="currentRoute === 'Switches'"
    :action="action"
    context="switch"
  />
  <ActionTransceiver
    v-if="currentRoute === 'Transceivers'"
    :action="action"
    context="transceiver"
  />
  <ActionWiFi v-if="currentRoute === 'WiFi'" :action="action" context="wifi" />
</template>

<script setup>
import ActionMachine from "./ActionMachine";
import ActionMobile from "./ActionMobile";
import ActionPrinter from "./ActionPrinter";
import ActionScanner from "./ActionScanner";
import ActionRouter from "./ActionRouter";
import ActionSwitch from "./ActionSwitch";
import ActionTransceiver from "./ActionTransceiver";
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
