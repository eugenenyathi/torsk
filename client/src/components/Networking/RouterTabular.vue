<template>
  <table class="tabular">
    <thead>
      <tr>
        <th class="checkbox">
          <input type="checkbox" class="checkbox" />
        </th>
        <th>
          Location
          <Search
            v-if="!showReloadIcon"
            class="filter-icon"
            @click="$emit('openFilterList')"
          />
          <Reload
            v-if="showReloadIcon"
            class="filter-icon"
            @click="$emit('reload')"
          />
        </th>
        <th>IP Address</th>
        <th>Antennas</th>
        <th>Ports</th>
        <th>Dead ports</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="machine in machines"
        :key="machine.id"
        :class="{
          isActive: isActiveId === machine.id,
        }"
        @click="selectMachine(machine.id)"
      >
        <td>
          <input
            type="checkbox"
            class="checkbox"
            :value="machine.id"
            :checked="isActiveId === machine.id"
            v-model="checkbox"
          />
        </td>
        <td>{{ machine.location }}</td>
        <td>{{ machine.ipaddress }}</td>

        <td v-if="machine.antennas === 'yes'">
          <Check class="filter-icon dark" />
        </td>
        <td v-else>
          <Close class="filter-icon dark" />
        </td>

        <td>{{ machine.ports }}</td>
        <td>{{ machine.deadports }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import Search from "vue-material-design-icons/FilterOutline.vue";
import Reload from "vue-material-design-icons/Reload.vue";
import Check from "vue-material-design-icons/Check.vue";
import Close from "vue-material-design-icons/Close.vue";
import conceal from "conceal";

import { useStore } from "vuex";
import { ref, watch, computed } from "vue";

const props = defineProps({
  machines: Array,
  showReloadIcon: Boolean,
});
const emit = defineEmits(["open", "openFilterList", "reload"]);
const store = useStore();

const isActiveId = ref(0);
const checkbox = ref([]);

watch(checkbox, (newValue, oldValue) => console.log(newValue));

const selectMachine = (machineId) => {
  isActiveId.value = machineId;
  const data = props.machines.find((machine) => machine.id === machineId);
  store.dispatch("setTransitData", data);
  store.dispatch("setGreyOutAction", true);
  emit("open");
};

const showActionsMenu = computed(() => store.getters.showActionsMenu);

watch(showActionsMenu, (newValue, oldValue) => {
  if (newValue === false) {
    isActiveId.value = 0;
  }
});
</script>
