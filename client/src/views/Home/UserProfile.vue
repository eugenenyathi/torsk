<template>
  <div class="user-profile-wrapper position-container">
    <div class="profile-wrapper">
      <h2 class="heading">About You</h2>
      <div class="info">
        <p>Username</p>
        <p>{{ profile.username }}</p>
      </div>
      <div class="info">
        <p>Name</p>
        <p>{{ profile.fullName }}</p>
      </div>
      <div class="info">
        <p>Email</p>
        <p>{{ profile.email }}</p>
      </div>
      <div class="info">
        <p>Role</p>
        <p>{{ profile.role }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import useAxiosError from "../../composables/useAxiosError";
import axios from "axios";
import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const user = computed(() => store.getters.getUser);
const { email } = user.value;

const profile = ref("");
const axiosError = ref("");

const fetchProfile = async (email) => {
  try {
    const { data } = await axios("/settings");
    profile.value = data;
  } catch (err) {
    useAxiosError(err, axiosError);
  }
};

fetchProfile(email);
</script>
