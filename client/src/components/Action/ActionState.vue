<template>
  <section class="update-container action-info">
    <div class="update-content action-state">
      <form @submit.prevent="handleSubmit">
        <h2 class="context-heading">
          {{ data.context }}
        </h2>

        <div v-if="action === 'faulty'" class="text-wrapper">
          <ChevronRight />
          <p v-if="!data.faulty">
            Confirm adding this {{ context }} as faulty.
          </p>
          <p v-else>Confirm removing this {{ context }} as faulty.</p>
        </div>

        <div v-else-if="action === 'dec'" class="text-wrapper">
          <ChevronRight />
          <p v-if="!data.decommission">
            Confirm you want to decommission this {{ context }}.
          </p>
          <p v-else>Confirm you want to re-commission this {{ context }}.</p>
        </div>

        <div v-else-if="action === 'delete'" class="text-wrapper">
          <ChevronRight />
          Confirm you want to <b>delete </b> this {{ context }}
        </div>

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
import useAction from "@/composables/useAction";

import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps({
  action: String,
  context: String,
});

const data = computed(() => store.getters.getTransitData);
const { isLoading, deleteEntry, updateAssetState } = useAction();

const handleAction = () => {
  switch (props.action) {
    case "delete":
      deleteEntry();
      break;
    case "faulty":
      updateAssetState({ action: "faulty", value: !data.value.faulty });
      break;
    case "dec":
      updateAssetState({
        action: "decommission",
        value: !data.value.decommission,
      });
      break;
    default:
      console.log("action not found");
  }
};
</script>
