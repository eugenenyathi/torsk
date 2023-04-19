<template>
  <section class="choice-container">
    <div class="choice-content">
      <h2>Add a new</h2>
      <div class="ul-top-wrapper">
        <ul class="ul-container">
          <li class="list-item" @click="loadChoice('Desktops')">Desktop</li>
          <li class="list-item" @click="loadChoice('Laptops')">Laptop</li>
          <li class="list-item" @click="loadChoice('Cellphones')">Cellphone</li>
          <li class="list-item" @click="loadChoice('Printers')">Printer</li>
          <li class="list-item" @click="loadChoice('Scanners')">Scanner</li>
          <li class="list-item" @click="loadChoice('Routers')">Router</li>
          <li class="list-item" @click="loadChoice('Switches')">Switch</li>
        </ul>
        <div class="ul-container">
          <li class="list-item" @click="loadChoice('Transceivers')">
            Transceiver
          </li>
          <li class="list-item" @click="loadChoice('WiFi')">WiFi</li>
          <li class="list-item" @click="loadChoice('Telephones')">
            Telephones
          </li>
          <li class="list-item" @click="loadChoice('Remote Desktop')">
            Remote Desktop
          </li>
          <li class="list-item" @click="loadChoice('EmailList')">Email</li>
          <li class="list-item" @click="loadChoice('Software')">Software</li>
        </div>
      </div>
      <Close class="search-icon close-icon" @click="$emit('close')" />
    </div>
  </section>
</template>

<script setup>
import Plus from "vue-material-design-icons/Plus.vue";
import Close from "vue-material-design-icons/Close.vue";

import { useRouter } from "vue-router";

import useNewEntry from "../../composables/useNewEntry";

const emit = defineEmits(["close"]);
const router = useRouter();

const { navigateToRoute } = useNewEntry();

const loadChoice = (target) => {
  navigateToRoute(target);
  emit("close");
};
</script>
