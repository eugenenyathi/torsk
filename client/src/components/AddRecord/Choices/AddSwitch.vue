<template>
  <section class="position-container">
    <div class="add-entry-container">
      <div class="add-entry-content">
        <h2>Add a new switch</h2>
        <form @submit.prevent="handleSubmit()">
          <div class="entry-control">
            <label for="">Model</label>
            <input
              type="text"
              class="entry-input"
              placeholder="e.g. TPLink R200"
            />
          </div>
          <div class="entry-control">
            <label for="">Location</label>
            <input
              type="text"
              class="entry-input"
              placeholder="e.g. server room"
            />
          </div>
          <div class="entry-control">
            <label for="">Ports</label>
            <input type="number" class="entry-input" />
          </div>
          <div class="entry-control">
            <label for="">Dead ports</label>
            <input type="number" class="entry-input" />
          </div>
          <button class="add-btn" :disabled="isLoading">add</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup></script>
