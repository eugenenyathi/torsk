<template>
  <section class="position-container">
    <div class="add-entry-container">
      <div class="add-entry-content">
        <Transition name="switch" mode="out-in">
          <div v-if="page === 1" class="page-wrapper">
            <h2>Add a new device</h2>
            <form @submit.prevent="subSubmit()">
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
                  <input
                    type="text"
                    class="entry-input"
                    placeholder="e.g. 400"
                  />
                  <span class="cool-span">GB</span>
                </div>
              </div>

              <button class="add-btn" :disabled="isLoading">continue</button>
            </form>
          </div>
          <div v-else class="page-wrapper">
            <form @submit.prevent="handleSubmit()">
              <div class="entry-control">
                <label for="">MAC Address</label>
                <input type="text" class="entry-input" />
              </div>
              <div class="entry-control">
                <label for="">Serial Number</label>
                <input type="text" class="entry-input" />
              </div>
              <div class="entry-control">
                <label for="">IMEI Number</label>
                <input type="text" class="entry-input" />
              </div>

              <button class="add-btn" :disabled="isLoading">add</button>
              <div class="go-back" @click="pop">
                <ChevronRight />
                <span>Back</span>
              </div>
            </form>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>

<script setup>
import ChevronRight from "vue-material-design-icons/ChevronRight.vue";
import { ref } from "vue";

const page = ref(1);

const subSubmit = () => {
  page.value = 2;
};

const pop = () => {
  page.value = 1;
};
</script>
