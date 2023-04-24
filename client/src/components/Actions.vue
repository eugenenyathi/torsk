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
            'list-item': !greyOutAction.specs || isActiveId !== 1,
            'list-item active': !greyOutAction.specs && isActiveId === 1,
            'list-item grey-out': greyOutAction.specs,
          }"
          @click="openAction('specs', 1)"
        >
          <List class="icon" />
          <p v-if="!showAction">Specs</p>
        </li>
        <li
          :class="{
            'list-item': !greyOutAction.update || isActiveId !== 2,
            'list-item active': !greyOutAction.update && isActiveId === 2,
            'list-item grey-out': greyOutAction.update,
          }"
          @click="openAction('update', 2)"
        >
          <Update class="icon" />
          <p v-if="!showAction">Update</p>
        </li>
        <li
          :class="{
            'list-item': !greyOutAction.faulty || isActiveId !== 3,
            'list-item active': !greyOutAction.faulty && isActiveId === 3,
            'list-item grey-out': greyOutAction.faulty,
          }"
          @click="openAction('faulty', 3)"
        >
          <HelpCircle v-if="!data.faulty" class="icon" />
          <Check v-else-if="data.faulty" class="icon colored" />
          <p v-if="!showAction">Faulty</p>
        </li>
        <li
          :class="{
            'list-item': !greyOutAction.decommission || isActiveId !== 4,
            'list-item active': !greyOutAction.decommission && isActiveId === 4,
            'list-item grey-out': greyOutAction.decommission,
          }"
          @click="openAction('dec', 4)"
        >
          <ArchiveOutline v-if="!data.decommissioned" class="icon" />
          <Check v-else-if="data.decommissioned" class="icon colored" />

          <p v-if="!showAction && !data.decommissioned">Decommission</p>
          <p v-else-if="!showAction && data.decommissioned">Decommissioned</p>
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

//icons
import Trash from "vue-material-design-icons/TrashCanOutline.vue";
import Close from "vue-material-design-icons/Close.vue";
import List from "vue-material-design-icons/FormatListGroup.vue";
import Update from "vue-material-design-icons/Update.vue";
import HelpCircle from "vue-material-design-icons/HelpCircleOutline.vue";
import ArchiveOutline from "vue-material-design-icons/ArchiveOutline.vue";
import Check from "vue-material-design-icons/Check.vue";
// import ProgressWrench from "vue-material-design-icons/ProgressWrench.vue";
// import ProgressQuestion from "vue-material-design-icons/ProgressQuestion.vue";

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

const data = computed(() => store.getters.getTransitData);

const openAction = (category, listItemID) => {
  isActiveId.value = listItemID;

  switch (category) {
    case "specs":
      showAction.value = greyOutAction.value.specs ? false : true;
      action.value = "specs";
      break;
    case "update":
      showAction.value = greyOutAction.value.update ? false : true;
      action.value = "update";
      break;
    case "faulty":
      showAction.value = greyOutAction.value.faulty ? false : true;
      action.value = "faulty";
      break;
    case "dec":
      showAction.value = greyOutAction.value.decommission ? true : false;
      action.value = "dec";
      break;
    case "delete":
      showAction.value = true;
      action.value = "delete";
      break;
  }
};

const closeMenu = () => {
  isActiveId.value = 0;
  showAction.value = false;
  action.value = "";
  store.commit("closeActionsMenu", false);
  store.commit("setGreyOutAction", {
    specs: false,
    update: false,
    decommission: false,
  });
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
