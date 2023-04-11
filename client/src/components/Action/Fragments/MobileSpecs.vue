<template>
  <section class="specs-container action-info">
    <div class="info">
      <Devices class="icon" />
      <div class="spec uppercase">
        <p>Model</p>
        <p>{{ data.model }}</p>
      </div>
    </div>
    <div class="info">
      <Devices class="icon" />
      <div class="spec">
        <p>Operating System</p>
        <p>{{ data.os }}</p>
      </div>
    </div>
    <div class="info">
      <Devices class="icon" />
      <div class="spec">
        <p>MAC Address</p>
        <p :style="{ textTransform: 'none' }">{{ data.macAddress }}</p>
      </div>
    </div>
    <div class="info">
      <Devices class="icon" />
      <div class="spec uppercase">
        <p>Serial Number</p>
        <p>{{ data.serialNumber }}</p>
      </div>
    </div>
    <div class="info">
      <Devices class="icon" />
      <div class="spec">
        <p>IMEI</p>
        <p>{{ data.imei }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const data = computed(() => store.getters.getTransitData);
</script>
