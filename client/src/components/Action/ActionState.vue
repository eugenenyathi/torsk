<template>
  <section class="update-container action-info">
    <div class="update-content action-state">
      <form @submit.prevent="handleSubmit">
        <h2 class="context-heading">
          {{ data.machine || data.user || data.location }} {{ context }}
        </h2>
        <p v-if="action === 'faulty'">
          <ChevronRight />
          Confirm adding this {{ context }} as faulty.
        </p>
        <p v-else-if="action === 'dec'">
          <ChevronRight />
          Confirm you want to decommission this {{ context }}.
        </p>
        <p v-else-if="action === 'delete'">
          <ChevronRight />
          Confirm you want to <span>delete </span> this {{ context }}
        </p>

        <button
          v-if="!isLoading"
          class="update-btn"
          :disabled="isLoading"
          @click="handleAction"
        >
          confirm
        </button>
        <button
          v-else
          class="update-btn"
          :disabled="isLoading"
          @click="handleAction"
        >
          confirm
          <Loader />
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
import ChevronRight from "vue-material-design-icons/ChevronRight.vue";
import Loader from "@/components/BtnLoader.vue";
import useDeleteEntry from "@/composables/useDeleteEntry";

import { ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps({
  action: String,
  context: String,
});

const data = computed(() => store.getters.getTransitData);
const { isLoading, deleteEntry } = useDeleteEntry();

const handleAction = () => {
  switch (props.action) {
    case "delete":
      deleteEntry();
      break;
  }
};
</script>
