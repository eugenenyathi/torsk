<template>
  <table class="tabular">
    <thead>
      <tr>
        <!-- <th class="checkbox">
          <input type="checkbox" class="checkbox" />
        </th> -->
        <th></th>
        <th>
          User
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
        <th>Machine</th>
        <th>OS</th>
        <th>Ms Office</th>
        <th>RAM</th>
        <!-- <th>Purchased</th> -->
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(machine, index) in machines"
        :key="machine._id"
        :data-index="index"
        :class="{ isActive: isActiveId === machine._id }"
        @click="selectMachine(machine._id)"
      >
        <!-- <td>
          <input
            type="checkbox"
            class="checkbox"
            :value="machine.id"
            :checked="isActiveId === machine.id"
            v-model="checkbox"
          />
        </td> -->
        <td></td>
        <td>{{ machine.user }}</td>
        <td>{{ machine.machine }}</td>
        <td>{{ machine.os }}</td>
        <td>{{ machine.office }}</td>
        <td>{{ machine.ram }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import Search from "vue-material-design-icons/FilterOutline.vue";
import Reload from "vue-material-design-icons/Reload.vue";

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
  const data = props.machines.find((machine) => machine._id === machineId);
  store.dispatch("setTransitData", { route: "devices", ...data });

  emit("open");
};

const showActionsMenu = computed(() => store.getters.showActionsMenu);

watch(showActionsMenu, (newValue, oldValue) => {
  if (newValue === false) {
    isActiveId.value = 0;
  }
});
</script>
