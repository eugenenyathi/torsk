<template>
  <button type="button" :="$attrs" @click="$emit('btnFn')">
    <EyeOutline v-if="IconType === clear" />
    <EyeOffOutline v-else />
  </button>
</template>

<script setup>
const props = defineProps({ IconType: String });
const emits = defineEmits(["btnFn"]);

//icons
import EyeOutline from "vue-material-design-icons/EyeOutline.vue";
import EyeOffOutline from "vue-material-design-icons/EyeOffOutline.vue";
</script>
