<template>
  <table class="tabular">
    <thead>
      <tr>
        <th></th>
        <th>Category</th>
        <th>We run</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="data in softwares"
        :key="data._id"
        :class="{
          isActive: isActiveId === data._id,
        }"
        @click="selectMachine(data._id)"
      >
        <td></td>
        <td>{{ data.category }}</td>
        <td>{{ data.software }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
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
  const data = props.softwares.find((machine) => machine._id === machineId);
  store.dispatch("setTransitData", { route: "software", ...data });

  const route = `/software/${machineId}`;
  router.push(route);

  store.dispatch("switchHeaderBtn", {
    showDeleteBtn: true,
    showEditBtn: false,
    showAddBtn: false,
  });
};

const showActionsMenu = computed(() => store.getters.showActionsMenu);

watch(showActionsMenu, (newValue, oldValue) => {
  if (newValue === false) {
    isActiveId.value = 0;
  }
});
</script>
