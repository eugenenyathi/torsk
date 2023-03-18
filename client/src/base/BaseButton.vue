<template>
	<button v-bind="$attrs" @click="$emit(btnFn)">{{ text }}</button>
</template>

<script setup>
// import { defineProps, defineEmits } from "vue";

const props = defineProps({ text: String });
const emits = defineEmits(["btnFn"]);
</script>
