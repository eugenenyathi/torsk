<template>
  <table class="tabular">
    <thead>
      <tr>
        <th class="checkbox">
          <input type="checkbox" class="checkbox" />
        </th>
        <th>Router Location</th>
        <th>SSID</th>
        <th>Password</th>
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
        <td>{{ machine.router }}</td>
        <td>{{ machine.ssid }}</td>
        <td>{{ machine.password }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
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
