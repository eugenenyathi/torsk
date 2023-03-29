<template>
  <div class="select-menu">
    <div
      :class="{ 'select-btn': !active, 'select-btn active': active }"
      @click="toggleMenu"
    >
      <span class="sBtn-text" v-if="!selectedOption"
        >Select your {{ context }}</span
      >
      <span class="sBtn-text" v-else> {{ selectedOption }}</span>

      <ChevronDown class="chevron-icon" />
    </div>

    <ul :class="{ 'options ': !active, 'options active': active }">
      <li
        class="option"
        v-for="option in options"
        @click="selectOption(option)"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import ChevronDown from "vue-material-design-icons/ChevronDown";
import { ref } from "vue";

const props = defineProps({ context: String, options: Array });
const emit = defineEmits(["selectedOption"]);

const active = ref(false);
const selectedOption = ref("");

const toggleMenu = () => {
  active.value = !active.value;
};

const selectOption = (option) => {
  selectedOption.value = option;
  active.value = false;
  emit("selectedOption", option);
};
</script>
