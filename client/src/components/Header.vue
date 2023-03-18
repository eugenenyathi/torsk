<template>
  <div class="header-container">
    <div class="header-content">
      <h2 class="route-name">{{ currentRoute }}</h2>
      <div class="flow-right">
        <button class="add-btn" v-if="!showDeleteBtn" @click="addNewEntry()">
          <Plus class="plus-icon" />
          Add
        </button>
        <button class="delete-btn" v-else>Delete</button>
        <div class="user-profile">
          <span class="user-name">{{ getStoreUser.name }}</span>
          <button class="user-icon" @click="toggleMenu">
            <Arrow />
          </button>
          <UserDropdown :showMenu="showMenu" @closeMenu="closeMenu" />
        </div>
      </div>
    </div>
  </div>

  <teleport to="#port-modal">
    <ChoiceSheet v-if="showSheet" @close="closeChoiceSheet" />
    <LoadChoice v-if="showChoice" :choice="choice" @close="closeChoice" />
  </teleport>
</template>

<script setup>
import UserDropdown from "./UserDropdown.vue";
import Plus from "vue-material-design-icons/Plus.vue";
import Arrow from "vue-material-design-icons/AccountArrowDown.vue";

//composables & helpers
import useLogin from "../composables/useLogin.js";
import useNewEntry from "../composables/useNewEntry.js";

//components
import ChoiceSheet from "./AddRecord/ChoiceSheet.vue";
import LoadChoice from "./AddRecord/LoadChoice.vue";

import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();

const showSheet = ref(false);
const showChoice = ref(false);
const choice = ref("");
const showMenu = ref(false);

const { loggedIn } = useLogin();
const { navigateToRoute } = useNewEntry();

const showDeleteBtn = computed(() => store.getters.showDeleteBtn);
const currentRoute = computed(() => useRoute().name);

// console.log(currentRoute.value);

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

const closeMenu = () => {
  showMenu.value = false;
};

const getStoreUser = loggedIn();

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
