<template>
  <div
    :class="{
      'user-dropdown-container': !showMenu,
      'user-dropdown-container show-dropdown': showMenu,
    }"
  >
    <div class="user-dropdown-content">
      <ul class="ul-dropdown-wrapper">
        <!-- <li class="dropdown-list-item">
          <router-link to="/user_profile" @click="$emit('closeMenu')">
            Profile
          </router-link>
        </li> -->
        <li class="dropdown-list-item">
          <router-link to="/user_settings" @click="$emit('closeMenu')">
            Settings
          </router-link>
        </li>
        <li class="dropdown-list-item">
          <router-link to="/logout" @click="$emit('closeMenu')">
            Logout
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ showMenu: Boolean });
</script>
