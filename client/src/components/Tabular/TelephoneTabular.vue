<template>
  <table class="tabular">
    <thead>
      <tr class="no-flex-second-child">
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
        <th>Extension</th>
        <th>Direct Line</th>
        <th>Model</th>
        <th>Serial Number</th>
        <!-- <th>Purchased</th> -->
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="machine in machines"
        :key="machine._id"
        :class="{
          isActive: isActiveId === machine._id,
        }"
        @click="selectMachine(machine._id)"
      >
        <td></td>
        <td>{{ machine.user }}</td>
        <td>{{ machine.extension }}</td>
        <td>{{ machine.directLine }}</td>
        <td>{{ machine.model }}</td>
        <td>{{ machine.serialNumber }}</td>
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
  const data = props.machines.find((machine) => machine._id === machineId);
  store.dispatch("flushTransitFormData");
  store.dispatch("setTransitData", { route: "telephone", ...data });

  //push to the adding page
  const route = `/telephones/${machineId}`;
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
