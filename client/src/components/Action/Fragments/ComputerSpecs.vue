<template>
  <section class="specs-container action-info">
    <div class="info">
      <Devices class="icon" />
      <div class="spec">
        <p>Machine</p>
        <p>{{ data.name }}</p>
      </div>
    </div>
    <div class="info">
      <Devices class="icon" />
      <div class="spec">
        <p>Model</p>
        <p>Samsung</p>
      </div>
    </div>
    <div class="top-tree">
      <Devices class="icon" />
      <div class="specs-wrapper">
        <div class="spec">
          <p>Operating System</p>
          <p>{{ data.os }}</p>
        </div>
        <div class="spec">
          <p>CPU</p>
          <p>Dual Core Intel Celeron B800</p>
        </div>
        <div class="spec">
          <p>RAM</p>
          <p>{{ data.ram }}</p>
        </div>
      </div>
    </div>
    <div class="info">
      <Devices class="icon" />
      <div class="spec">
        <p>Storage</p>
        <p>HDD 450GB</p>
      </div>
    </div>
    <div class="info">
      <Devices class="icon" />
      <div class="spec">
        <p>MAC Address</p>
        <p>40-60-A3-77-89</p>
      </div>
    </div>
    <div class="info">
      <Devices class="icon" />
      <div class="spec">
        <p>Desktop Serial Number</p>
        <p>RFX-8954</p>
      </div>
    </div>
    <div class="info">
      <Devices class="icon" />
      <div class="spec">
        <p>Monitor Serial Number</p>
        <p>AKG-3421</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const data = computed(() => store.getters.getTransitData);
</script>
