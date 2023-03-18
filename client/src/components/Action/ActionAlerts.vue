<template>
  <section class="action-alert-container">
    <div class="action-alert-content">
      <h2 v-if="action === 'faulty'">Machine has been added as faulty.</h2>
      <h2 v-else-if="action === 'dec'">Machine has been decommissioned.</h2>
      <h2 v-else-if="action === 'delete'">Machine has been deleted.</h2>
      <Close class="search-icon close-icon" @click="$emit('close')" />
    </div>
  </section>
</template>

<script setup>
import Close from "vue-material-design-icons/Close.vue";

const props = defineProps({
  action: String,
});

const emits = defineEmits(["close"]);

// console.log(props.action);
</script>
