<template>
  <section class="position-container">
    <div class="add-entry-container">
      <div class="add-entry-content">
        <h2>Add a new network</h2>
        <form @submit.prevent="handleSubmit()">
          <div class="entry-control">
            <label for="">Router Location</label>
            <input
              type="text"
              class="entry-input"
              placeholder="e.g. Server room"
            />
          </div>
          <div class="entry-control">
            <label for="">SSID</label>
            <input
              type="text"
              class="entry-input"
              placeholder="e.g. VFCC_ICT"
            />
          </div>
          <div class="entry-control">
            <label for="">Password</label>
            <input type="password" class="entry-input" />
          </div>
          <button class="add-btn" :disabled="isLoading">add</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup></script>
