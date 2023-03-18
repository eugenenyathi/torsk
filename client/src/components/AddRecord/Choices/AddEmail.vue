<template>
  <section class="position-container">
    <div class="add-entry-container">
      <div class="add-entry-content">
        <h2>Add a new email</h2>
        <form @submit.prevent="handleSubmit()">
          <div class="entry-control">
            <label for="">User</label>
            <input
              type="text"
              class="entry-input"
              placeholder="e.g. IT Technician"
            />
          </div>
          <div class="entry-control">
            <label for="">Email</label>
            <input type="text" class="entry-input" />
          </div>
          <div class="entry-control">
            <label for="">Password</label>
            <input type="text" class="entry-input" />
          </div>

          <button class="add-btn" :disabled="isLoading">add</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup></script>
