<template>
  <section>
    <Transition name="switch" mode="out-in">
      <div class="list-view-container">
        <div class="list-view-content" v-if="currentRoute === 'faulty assets'">
          <router-link
            :to="route.path"
            class="list-view-item"
            v-for="route in faultyRoutes"
          >
            <p class="info-head">{{ route.name }}</p>
            <ChevronRight />
          </router-link>
        </div>
        <div class="list-view-content" v-else>
          <router-link
            :to="route.path"
            class="list-view-item"
            v-for="route in decommissionedRoutes"
          >
            <p class="info-head">{{ route.name }}</p>
            <ChevronRight />
          </router-link>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import ChevronRight from "vue-material-design-icons/ChevronRight.vue";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const store = useStore();

store.dispatch("switchHeaderBtn", {
  showAddBtn: false,
  showEditBtn: false,
  showDeleteBtn: false,
});

const faultyRoutes = ref([
  {
    path: `/asset-state/faulty/devices/servers/`,
    name: "Devices",
  },
  {
    path: `/asset-state/faulty/office-equipment/printers`,
    name: "Office Equipment",
  },
  {
    path: `/asset-state/faulty/networking/routers`,
    name: "Networking",
  },
]);

const decommissionedRoutes = ref([
  {
    path: `/asset-state/decommissioned/devices/servers/`,
    name: "Devices",
  },
  {
    path: `/asset-state/decommissioned/office-equipment/printers`,
    name: "Office Equipment",
  },
  {
    path: `/asset-state/decommissioned/networking/routers`,
    name: "Networking",
  },
]);

const currentRoute = computed(() => useRoute().name.toLowerCase());
</script>
