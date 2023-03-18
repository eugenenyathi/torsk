<template>
  <section class="position-container">
    <div class="add-entry-container">
      <div class="add-entry-content">
        <h2>Add a new software</h2>
        <form @submit.prevent="handleSubmit()">
          <div class="entry-control">
            <label for="">Category</label>
            <input type="text" class="entry-input" placeholder="e.g. Network" />
          </div>
          <div class="entry-control">
            <label for="">We run</label>
            <input type="text" class="entry-input" placeholder="e.g. Sophos" />
          </div>
          <button class="add-btn" :disabled="isLoading">add</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup></script>
