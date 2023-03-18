<template>
  <section class="position-container">
    <div class="add-entry-container">
      <div class="add-entry-content">
        <h2>Add a new address</h2>
        <form @submit.prevent="handleSubmit()">
          <div class="entry-control">
            <label for="">Machine </label>
            <input
              type="text"
              class="entry-input"
              placeholder="e.g. ITSUPPORT"
            />
          </div>
          <div class="entry-control">
            <label for="">User</label>
            <input
              type="text"
              class="entry-input"
              placeholder="e.g. IT Technician"
            />
          </div>
          <div class="entry-control">
            <label for="">Remote Address</label>
            <input
              type="number"
              class="entry-input"
              placeholder="e.g. 400444555"
            />
          </div>

          <button class="add-btn" :disabled="isLoading">add</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup></script>
