<template>
  <div class="header-container">
    <div class="header-content">
      <h2 class="route-name">{{ currentRoute }}</h2>
      <div class="flow-right">
        <button
          class="add-btn"
          v-if="switchHeaderBtn.showAddBtn"
          @click="addNewEntry()"
        >
          <Plus class="plus-icon" />
          Add
        </button>

        <button
          class="add-btn"
          v-else-if="switchHeaderBtn.showEditBtn"
          @click="EditEntry()"
        >
          <Pencil class="plus-icon" />
          Edit
        </button>

        <div class="btn-container" v-else-if="switchHeaderBtn.showDeleteBtn">
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
import Pencil from "vue-material-design-icons/Pencil.vue";

//composables & helpers
import useLogin from "@/composables/useLogin.js";
import useNewEntry from "@/composables/useNewEntry.js";
import useAuth from "@/composables/useAuth.js";
import useAction from "@/composables/useAction";

//components
import ChoiceSheet from "./AddRecord/ChoiceSheet.vue";
import FlushMessage from "./FlushMessage.vue";
import Loader from "./BtnLoader";

import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

//TODO red loader for the delete btn

const store = useStore();
const router = useRouter();

const showSheet = ref(false);
const showChoice = ref(false);

const choice = ref("");
const showMenu = ref(false);

const { getAuthUser } = useAuth();
const { navigateToRoute } = useNewEntry();
const { isLoading, deleteEntry } = useAction();

const switchHeaderBtn = computed(() => store.getters.switchHeaderBtn);
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

const EditEntry = () => {
  switch (currentRoute.value) {
    case "EmailConfig":
      router.push("/emails/config/edit");
      break;
    case "NetworkConfig":
      router.push("/networking/config/edit");
      break;
  }
};

//close the choice-sheet but pass on the choice
//selected to the LoadChoice file
const closeChoiceSheet = () => {
  showSheet.value = false;
};
</script>
