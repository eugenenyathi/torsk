<template>
  <table class="tabular">
    <thead>
      <tr>
        <!-- <th class="checkbox">
          <input type="checkbox" class="checkbox" />
        </th> -->
        <th></th>
        <th>Router Location</th>
        <th>SSID</th>
        <th>Password</th>
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
        <!-- <td>
          <input
            type="checkbox"
            class="checkbox"
            :value="machine.id"
            :checked="isActiveId === machine._id"
            v-model="checkbox"
          />
        </td> -->
        <td></td>
        <td :class="{ 'upper-case': machine.location === 'it' }">
          {{ machine.location }}
        </td>
        <td class="upper-case">{{ machine.ssid }}</td>
        <td class="lower-case">{{ machine.password }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref, watch, computed } from "vue";

const props = defineProps({
  machines: Array,
  showReloadIcon: Boolean,
});

const emit = defineEmits(["open", "openFilterList", "reload"]);
const store = useStore();
const router = useRouter();

const isActiveId = ref(0);
const checkbox = ref([]);

const selectMachine = (machineId) => {
  const data = props.machines.find((machine) => machine._id === machineId);
  store.dispatch("setTransitData", { route: "/networking/wifi", ...data });

  const route = `/networking/wifi/${machineId}`;
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
