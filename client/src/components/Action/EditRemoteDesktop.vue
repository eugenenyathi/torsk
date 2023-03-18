<template>
  <section class="position-container">
    <div class="add-entry-container">
      <div class="add-entry-content">
        <h2>Edit address</h2>
        <form @submit.prevent="handleSubmit()">
          <div class="entry-control">
            <label for="">Machine </label>
            <input type="text" class="entry-input" :value="data.name" />
          </div>
          <div class="entry-control">
            <label for="">User</label>
            <input type="text" class="entry-input" :value="data.user" />
          </div>
          <div class="entry-control">
            <label for="">Remote Address</label>
            <input type="number" class="entry-input" :value="data.address" />
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
