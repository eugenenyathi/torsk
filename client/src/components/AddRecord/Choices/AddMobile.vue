<template>
  <section class="position-container">
    <div class="add-entry-container">
      <div class="add-entry-content">
        <h2>Add a new device</h2>
        <form @submit.prevent="handleSubmit()">
          <div class="entry-control">
            <label for="">User</label>
            <input
              type="text"
              class="entry-input"
              placeholder="e.g. Town Clerk"
            />
          </div>
          <div class="entry-control">
            <label for="">Model</label>
            <input
              type="text"
              class="entry-input"
              placeholder="e.g. Samsung S22"
            />
          </div>
          <div class="entry-control">
            <label for="">OS</label>
            <input
              type="text"
              class="entry-input"
              placeholder="e.g. Android 14"
            />
          </div>
          <div class="entry-control">
            <label for="">Storage</label>
            <div class="storage-input-wrapper">
              <input type="text" class="entry-input" placeholder="e.g. 400" />
              <span class="cool-span">GB</span>
            </div>
          </div>

          <button class="add-btn" :disabled="isLoading">add</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup></script>
