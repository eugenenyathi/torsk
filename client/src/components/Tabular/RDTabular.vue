<template>
  <table class="tabular">
    <thead>
      <tr>
        <th></th>
        <th>
          Machine
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
        <th>User</th>
        <th>Remote Address</th>
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
        <td></td>
        <td>{{ machine.name }}</td>
        <td>{{ machine.user }}</td>
        <td>{{ machine.address }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import Search from "vue-material-design-icons/FilterOutline.vue";
import Reload from "vue-material-design-icons/Reload.vue";

import { ref, watch, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const props = defineProps({
  machines: Array,
  showReloadIcon: Boolean,
});

const emit = defineEmits(["open", "openFilterList", "reload"]);
const store = useStore();
const router = useRouter();

const isActiveId = ref(0);
const checkbox = ref([]);

watch(checkbox, (newValue, oldValue) => console.log(newValue));

const selectMachine = (machineId) => {
  const data = props.machines.find((machine) => machine.id === machineId);
  store.dispatch("setTransitData", data);

  const route = `/remote/${machineId}`;
  router.push(route);

  store.dispatch("setShowDeleteBtn", true);
};

const showActionsMenu = computed(() => store.getters.showActionsMenu);

watch(showActionsMenu, (newValue, oldValue) => {
  if (newValue === false) {
    isActiveId.value = 0;
  }
});
</script>
