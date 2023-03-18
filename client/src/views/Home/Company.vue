<template>
  <div class="company-profile-wrapper position-container">
    <div class="profile-wrapper">
      <h2 class="heading">Your company</h2>
      <div class="info">
        <p>Name</p>
        <p>{{ profile.org }}</p>
      </div>
      <div class="info">
        <p>Identity Code</p>
        <p>{{ profile.code }}</p>
      </div>
      <div class="info">
        <p>Date Joined</p>
        <p>{{ profile.joined }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import useAxiosError from "../../composables/useAxiosError";
import axios from "axios";
import { ref } from "vue";

const profile = ref("");
const axiosError = ref("");

const fetchProfile = async () => {
  try {
    const { data } = await axios("/settings");
    profile.value = data;
  } catch (err) {
    useAxiosError(err, axiosError);
  }
};

fetchProfile();
</script>
