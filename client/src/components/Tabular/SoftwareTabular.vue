<template>
  <table class="tabular">
    <thead>
      <tr>
        <th></th>
        <th>Catergory</th>
        <th>We run</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="data in softwares"
        :key="data.id"
        :class="{
          isActive: isActiveId === data.id,
        }"
        @click="selectMachine(data.id)"
      >
        <td></td>
        <td>{{ data.catergory }}</td>
        <td>{{ data.software }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import Search from "vue-material-design-icons/FilterOutline.vue";
import Reload from "vue-material-design-icons/Reload.vue";
import conceal from "conceal";

import { ref, watch, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const props = defineProps({
  softwares: Array,
});
const emit = defineEmits(["open"]);
const store = useStore();
const router = useRouter();

const isActiveId = ref(0);
const checkbox = ref([]);

watch(checkbox, (newValue, oldValue) => console.log(newValue));

const selectMachine = (machineId) => {
  const data = props.softwares.find((machine) => machine.id === machineId);
  store.dispatch("setTransitData", data);

  const route = `/software/${machineId}`;
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
