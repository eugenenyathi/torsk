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
        <li
          :class="{
            'list-item': !greyOutAction,
            'list-item grey-out': greyOutAction,
          }"
          @click="openAction('specs', 1)"
        >
          <List class="icon" />
          <p v-if="!showAction">Specs</p>
        </li>
        <li
          :class="{
            'list-item': isActiveId !== 2,
            'list-item active': isActiveId === 2,
          }"
          @click="openAction('update', 2)"
        >
          <Update class="icon" />
          <p v-if="!showAction">Update</p>
        </li>
        <li
          :class="{
            'list-item': isActiveId !== 3,
            'list-item active': isActiveId === 3,
          }"
          @click="openAction('faulty', 3)"
        >
          <HelpCircle class="icon" />
          <p v-if="!showAction">Faulty</p>
        </li>
        <li
          :class="{
            'list-item': isActiveId !== 4,
            'list-item active': isActiveId === 4,
          }"
          @click="openAction('dec', 4)"
        >
          <ArchiveOutline class="icon" />
          <p v-if="!showAction">Decommission</p>
        </li>
        <li
          :class="{
            'list-item': isActiveId !== 5,
            'list-item active': isActiveId === 5,
          }"
          @click="openAction('delete', 5)"
        >
          <Trash class="icon" />
          <p v-if="!showAction">Delete</p>
        </li>
      </ul>
      <Action v-if="showAction" :action="action" />
    </div>
  </aside>
</template>

<script setup>
//components
import Action from "./Action/ActionEntry.vue";
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
import { ref, computed, watch } from "vue";
// import { useRoute } from "vue-router";

const store = useStore();
const showActions = computed(() => store.getters.showActionsMenu);
const greyOutAction = computed(() => store.getters.greyOutAction);
const isActiveId = ref(0);
const action = ref("");
const showAction = ref(false);
const showAlert = ref(false);

const openAction = (category, listItemID) => {
  isActiveId.value = listItemID;

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
      showAction.value = true;
      // showAlert.value = true;
      action.value = "faulty";
      break;
    case "dec":
      showAction.value = true;
      // showAlert.value = true;
      action.value = "dec";
      break;
    case "delete":
      showAction.value = true;
      // showAlert.value = true;
      action.value = "delete";
      break;
  }
};

const closeMenu = () => {
  isActiveId.value = 0;
  showAction.value = false;
  action.value = "";
  store.commit("closeActionsMenu", false);
  store.commit("setGreyOutAction", false);
};

const closeAlert = () => {
  showAction.value = false;
  showAlert.value = false;
  store.commit("closeActionsMenu", false);
};

watch(showActions, (newValue, oldValue) => {
  if (newValue === false) {
    closeMenu();
  }
});
</script>
