<template>
  <section class="position-container">
    <div class="add-entry-container">
      <div class="add-entry-content">
        <h2>Add a new transceiver</h2>
        <form @submit.prevent="handleSubmit()">
          <div class="entry-control">
            <label for="">Model</label>
            <input type="text" class="entry-input" placeholder="e.g. HP P250" />
          </div>
          <div class="entry-control">
            <label for="">Location</label>
            <input
              type="text"
              class="entry-input"
              placeholder="e.g. DESKTOP-34562"
            />
          </div>
          <button class="add-btn" :disabled="isLoading">save</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup></script>
