<template>
  <section class="update-container action-info">
    <div class="update-content action-state">
      <form @submit.prevent="handleSubmit">
        <h2 class="context-heading">{{ data.name }}</h2>
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
          Confirm this <span>deletion</span>
        </p>

        <button class="update-btn">Confirm</button>
      </form>
    </div>
  </section>
</template>

<script setup>
import ChevronRight from "vue-material-design-icons/ChevronRight.vue";

import { ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps({
  action: String,
  context: String,
});

const data = computed(() => store.getters.getTransitData);
</script>
