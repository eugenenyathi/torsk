<template>
  <section class="position-container">
    <div class="add-entry-container">
      <div class="add-entry-content">
        <h2>Edit software</h2>
        <form @submit.prevent="handleSubmit()">
          <div class="entry-control">
            <label for="">Category</label>
            <input type="text" class="entry-input" :value="data.catergory" />
          </div>
          <div class="entry-control">
            <label for="">We run</label>
            <input type="text" class="entry-input" :value="data.software" />
          </div>
          <button class="add-btn" :disabled="isLoading">update</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const data = computed(() => store.getters.getTransitData);
</script>
