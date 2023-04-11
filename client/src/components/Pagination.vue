<template>
  <nav class="paginate-wrapper" v-if="pageNumbers.length > 0">
    <ul class="paginate-ul">
      <li
        class="list-item"
        v-for="page in pageNumbers"
        :key="page"
        @click="selectPage(page)"
        :class="{ isActive: isActiveId === page }"
      >
        {{ page }}
      </li>
    </ul>
    <div class="show-rows-wrapper">
      <h3>Show:</h3>
      <div class="show-rows-inner">
        <div class="row-number">
          <span>{{ rowsPerPage }}</span>
          rows
        </div>
        <div class="arrow-btns">
          <ChevronUp class="arrow-icon" @click="increaseRows" />
          <ChevronDown class="arrow-icon" @click="decreaseRows" />
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup>
import ChevronUp from "vue-material-design-icons/ChevronUp.vue";
import ChevronDown from "vue-material-design-icons/ChevronDown.vue";

import usePagination from "@/composables/usePagination.js";

import { ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const rowsPerPage = computed(() => store.getters.getRowsPerPage);
const pageNumbers = computed(() => store.getters.getPageNumbers);

const { pagination } = usePagination();

const isActiveId = computed(() => store.getters.getCurrentPage);

const selectPage = (pageNumber) => {
  pagination(pageNumber);
  // isActiveId.value = pageNumber;
  store.dispatch("setCurrentPage", pageNumber);
};

const increaseRows = () => {
  store.dispatch("setRowsPerPage", "increase");
};

const decreaseRows = () => {
  store.dispatch("setRowsPerPage", "decrease");
};
</script>
