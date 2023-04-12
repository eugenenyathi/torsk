<template>
  <Loader v-if="isLoading" />
  <table v-else class="tabular">
    <thead>
      <tr class="no-flex-second-child">
        <th></th>
        <th>
          User
          <Search
            v-if="!showReloadIcon"
            class="filter-icon"
            @click="$emit('openFilterList')"
          />
          <Reload
            v-if="showReloadIcon"
            class="filter-icon"
            @click="$emit('reload')"
          />
        </th>
        <th>Email</th>
        <th>Password</th>
        <!-- <th>Purchased</th> -->
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="email in emails"
        :key="email._id"
        :class="{
          isActive: isActiveId === email._id,
        }"
        @click="selectEmail(email._id)"
      >
        <td></td>
        <td>{{ email.user }}</td>
        <td>{{ email.email }}</td>
        <td>{{ email.password }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import Search from "vue-material-design-icons/FilterOutline.vue";
import Reload from "vue-material-design-icons/Reload.vue";

import Loader from "../Loader";

import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref, watch, computed } from "vue";

import useFetchRouteData from "@/composables/useFetchRouteData";

const props = defineProps({
  showReloadIcon: Boolean,
});

const emit = defineEmits(["openFilterList", "reload"]);

const store = useStore();
const router = useRouter();

store.dispatch("setBaseApiRoute", "/torsk/email");

const isActiveId = ref(0);

const emails = ref(computed(() => store.getters.getPaginatedData));
const { isLoading, fetchRouteData } = useFetchRouteData();

fetchRouteData();

const selectEmail = (emailId) => {
  isActiveId.value = emailId;
  const data = emails.value.find((email) => email._id === emailId);
  store.dispatch("flushTransitFormData");
  store.dispatch("setTransitData", {
    context: `${data.user} `,
    route: "email",
    ...data,
  });

  const route = `/emails/${emailId}`;
  router.push(route);

  store.dispatch("setShowDeleteBtn", true);
};

const showActionsMenu = computed(() => store.getters.showActionsMenu);

watch(showActionsMenu, (newValue, oldValue) => {
  if (newValue === false) {
    isActiveId.value = 0;
  }
});
</script>
