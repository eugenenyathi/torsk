<template>
  <div class="header-container">
    <div class="header-content">
      <h2 class="route-name">{{ currentRoute }}</h2>
      <div class="flow-right">
        <button class="add-btn" v-if="!showDeleteBtn" @click="addNewEntry()">
          <Plus class="plus-icon" />
          Add
        </button>

        <div class="btn-container" v-else>
          <button
            v-if="!isLoading"
            class="delete-btn"
            :disabled="isLoading"
            @click="deleteEntry()"
          >
            Delete
          </button>
          <button
            v-else
            class="delete-btn"
            :disabled="isLoading"
            @click="deleteEntry()"
          >
            Delete
            <Loader />
          </button>
        </div>

        <div class="user-profile">
          <span class="user-name">{{ authenticatedUser.name }}</span>
          <button class="user-icon" @click="toggleMenu">
            <Arrow />
          </button>
          <UserDropdown :showMenu="showMenu" @closeMenu="closeMenu" />
        </div>
      </div>
    </div>
  </div>

  <teleport to="#port-modal">
    <Transition name="popup" appear>
      <ChoiceSheet v-if="showSheet" @close="closeChoiceSheet" />
    </Transition>
    <Transition name="flush" appear>
      <FlushMessage v-if="showFlushMessage" />
    </Transition>
  </teleport>
</template>

<script setup>
import UserDropdown from "./UserDropdown.vue";
import Plus from "vue-material-design-icons/Plus.vue";
import Arrow from "vue-material-design-icons/AccountArrowDown.vue";

//composables & helpers
import useLogin from "@/composables/useLogin.js";
import useNewEntry from "@/composables/useNewEntry.js";
import useAuth from "@/composables/useAuth.js";
import useDeleteEntry from "@/composables/useDeleteEntry";

//components
import ChoiceSheet from "./AddRecord/ChoiceSheet.vue";
import FlushMessage from "./FlushMessage.vue";
import Loader from "./BtnLoader";

import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

//TODO red loader for the delete btn

const store = useStore();

const showSheet = ref(false);
const showChoice = ref(false);
// const showFlushMessage = ref(true);
const choice = ref("");
const showMenu = ref(false);

const { getAuthUser } = useAuth();
const { navigateToRoute } = useNewEntry();
const { isLoading, deleteEntry } = useDeleteEntry();

const showDeleteBtn = computed(() => store.getters.showDeleteBtn);
const showFlushMessage = computed(() => store.getters.showFlushMessage.state);
const currentRoute = computed(() => useRoute().name);

// console.log(currentRoute.value);

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

const closeMenu = () => {
  showMenu.value = false;
};

const authenticatedUser = getAuthUser();

const addNewEntry = () => {
  if (currentRoute.value === "Dashboard") {
    showSheet.value = true;
  } else {
    navigateToRoute(currentRoute.value);
  }
};

//close the choice-sheet but pass on the choice
//selected to the LoadChoice file
const closeChoiceSheet = () => {
  showSheet.value = false;
};
</script>
