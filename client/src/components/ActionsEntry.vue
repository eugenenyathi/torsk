<template>
  <aside
    :class="{
      'actions-container': !showActions,
      'actions-container active': showActions,
      'show-action': showActions && showAction,
    }"
  >
    <header class="actions-header">
      <h2>Actions</h2>
      <Close class="close-icon" @click="closeMenu" />
    </header>
    <div
      :class="{
        'actions-content': !showAction,
        'actions-content show-action': showAction,
      }"
    >
      <ul
        :class="{
          'actions-ul-wrapper no-show-action': !showAction,
          'actions-ul-wrapper show-action': showAction,
        }"
      >
        <li class="list-item" @click="openAction('specs')">
          <List class="icon" />
          <p v-if="!showAction">Specs</p>
        </li>
        <li class="list-item" @click="openAction('update')">
          <Update class="icon" />
          <p v-if="!showAction">Update</p>
        </li>
        <li class="list-item" @click="openAction('faulty')">
          <HelpCircle class="icon" />
          <p v-if="!showAction">Faulty</p>
        </li>
        <li class="list-item" @click="openAction('dec')">
          <ArchiveOutline class="icon" />
          <p v-if="!showAction">Decommission</p>
        </li>
        <li class="list-item" @click="openAction('delete')">
          <Trash class="icon" />
          <p v-if="!showAction">Delete</p>
        </li>
      </ul>
      <Action v-if="showAction" :action="action" />

      <teleport to="#port-modal">
        <ActionAlerts v-if="showAlert" :action="action" @close="closeAlert()" />
      </teleport>
    </div>
  </aside>
</template>

<script setup>
//components
import Action from "./Action";
import ActionAlerts from "./Action/ActionAlerts";
//icons
import Trash from "vue-material-design-icons/TrashCanOutline.vue";
import Close from "vue-material-design-icons/Close.vue";
import List from "vue-material-design-icons/FormatListGroup.vue";
import Update from "vue-material-design-icons/Update.vue";
import ProgressQuestion from "vue-material-design-icons/ProgressQuestion.vue";
import HelpCircle from "vue-material-design-icons/HelpCircleOutline.vue";
import ProgressWrench from "vue-material-design-icons/ProgressWrench.vue";
import ArchiveOutline from "vue-material-design-icons/ArchiveOutline.vue";

import { useStore } from "vuex";
import { ref, computed } from "vue";

const store = useStore();
const showActions = computed(() => store.getters.showActionsMenu);

const action = ref("");
const showAction = ref(false);
const showAlert = ref(false);

const openAction = (category) => {
  switch (category) {
    case "specs":
      showAction.value = true;
      action.value = "specs";
      break;
    case "update":
      showAction.value = true;
      action.value = "update";
      break;
    case "faulty":
      showAction.value = false;
      showAlert.value = true;
      action.value = "faulty";
      break;
    case "dec":
      showAction.value = false;
      showAlert.value = true;
      action.value = "dec";
      break;
    case "delete":
      showAction.value = false;
      showAlert.value = true;
      action.value = "delete";
      break;
  }
};

const closeMenu = () => {
  showAction.value = false;
  store.commit("closeActionsMenu", false);
};

const closeAlert = () => {
  showAction.value = false;
  showAlert.value = false;
  store.commit("closeActionsMenu", false);
};
</script>
