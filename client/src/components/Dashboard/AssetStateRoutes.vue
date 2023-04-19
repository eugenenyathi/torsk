<template>
  <DevicesList
    v-if="
      currentRoute === 'faulty-devices' ||
      currentRoute === 'decommissioned-devices'
    "
  />
  <OfficeEquipmentList
    v-else-if="
      currentRoute === 'faulty-officeequipment' ||
      currentRoute === 'decommissioned-officeequipment'
    "
  />
  <NetworkingList
    v-else-if="
      currentRoute === 'faulty-networkingdevices' ||
      currentRoute === 'decommissioned-networkingdevices'
    "
  />
  <TelephoneList
    v-else-if="
      currentRoute === 'faulty-telephones' ||
      currentRoute === 'decommissioned-telephones'
    "
  />
</template>

<script setup>
import DevicesList from "./Lists/DevicesList.vue";
import OfficeEquipmentList from "./Lists/OfficeEquipmentList.vue";
import NetworkingList from "./Lists/NetworkingList.vue";
import TelephoneList from "./Lists/TelephoneList.vue";

import { useRoute } from "vue-router";
import { computed } from "vue";
import store from "@/store";

store.dispatch("setShowAddBtn", false);
const currentRoute = computed(() => useRoute().name.toLowerCase());
</script>
