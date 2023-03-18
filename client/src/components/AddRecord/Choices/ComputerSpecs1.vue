<template>
  <h2>Add a new machine</h2>
  <form @submit.prevent="handleSubmit()">
    <div class="entry-control">
      <label for="">Model</label>
      <input type="text" class="entry-input" placeholder="e.g. HP P250" />
    </div>
    <div class="entry-control">
      <label for="">Machine</label>
      <input type="text" class="entry-input" placeholder="e.g. DESKTOP-34562" />
    </div>
    <div class="entry-control">
      <label>Operating system</label>
      <SelectBox context="operating system" :options="osOptions" />
    </div>
    <div class="entry-control cpu">
      <label>CPU</label>
      <div class="inner-control">
        <SelectBox context="cpu" :options="cpuOptions" />
        <div class="grand-child-control">
          <input type="number" class="entry-input" placeholder="8" />
          <span class="cool-span">Gen</span>
        </div>
      </div>
    </div>
    <button class="add-btn" :disabled="isLoading">add</button>
  </form>
</template>

<script setup>
import SelectBox from "../../../base/SelectBox.vue";

const emit = defineEmits(["next"]);

const osOptions = [
  "Windows 7",
  "Windows 8",
  "Windows 8.1",
  "Windows 10",
  "Windows 11",
  "Mac",
  "Linux",
];

const cpuOptions = [
  "Dual Core",
  "Core i3",
  "Core i4",
  "Core i5",
  "Core i6",
  "Core i7",
  "Core i9",
];

const handleSubmit = () => {
  emit("next");
};
</script>
