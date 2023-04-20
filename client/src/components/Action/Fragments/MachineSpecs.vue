<template>
  <section class="specs-container action-info">
    <div class="info">
      <Devices class="icon" />
      <div class="spec">
        <p>Machine</p>
        <p>{{ data.machine }}</p>
      </div>
    </div>
    <div class="info">
      <Devices class="icon" />
      <div class="spec uppercase">
        <p>Model</p>
        <p>{{ data.model }}</p>
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
          <p :style="{ textTransform: 'none' }">{{ data.cpu }}</p>
        </div>
        <div class="spec">
          <p>RAM</p>
          <p>{{ data.ram }}GB</p>
        </div>
      </div>
    </div>
    <div class="info">
      <Devices class="icon" />
      <div class="spec">
        <p>Storage</p>
        <p v-if="data.storageGigs < 1000">
          {{ data.storageType }} {{ data.storageGigs }}GB
        </p>
        <p v-else>{{ data.storageType }} {{ data.storageGigs / 1000 }} Tera</p>
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
    <div class="info" v-if="data.monitorSerialNumber">
      <Devices class="icon" />
      <div class="spec uppercase">
        <p>Monitor Serial Number</p>
        <p>{{ data.monitorSerialNumber }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
//TODO add proper icons
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const data = computed(() => store.getters.getTransitData);
</script>
