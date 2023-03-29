<template>
  <div class="select-menu searchable">
    <div class="select-control" v-if="!selectedOption">
      <input
        type="text"
        class="select-input"
        placeholder="Search  "
        v-model="searchInput"
      />
    </div>
    <div class="select-btn" v-else>
      <span class="sBtn-text"> {{ selectedOption }}</span>
      <Edit class="edit-icon" @click="showSearch()" />
    </div>
    <ul class="options" v-if="options.length > 0">
      <li
        class="option"
        v-for="option in options"
        :key="options._id"
        @click="selectOption(option)"
      >
        {{ option.user || option.location }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import Edit from "vue-material-design-icons/Pencil";
import { ref, watch } from "vue";

const props = defineProps({ data: Array, context: String });
const emit = defineEmits(["option"]);

const active = ref(false);
const searchInput = ref();
const options = ref([]);
const selectedOption = ref(false);

watch(searchInput, (newValue, oldValue) => {
  if (newValue.length < 2) options.value = [];
  else searchOption(searchInput.value);
});

const searchOption = (searchInput) => {
  if (props.context === "location") {
    let searchResults = props.data.filter((device) =>
      device.location.toLowerCase().startsWith(searchInput.toLowerCase())
    );

    if (searchResults.length > 0) options.value = searchResults;
  } else {
    let searchResults = props.data.filter((device) =>
      device.user.toLowerCase().startsWith(searchInput.toLowerCase())
    );

    if (searchResults.length > 0) options.value = searchResults;
  }
};

const selectOption = (option) => {
  if (props.context === "location") selectedOption.value = option.location;
  else selectedOption.value = option.user;
  options.value = [];
  emit("option", option._id);
};

const showSearch = () => {
  selectedOption.value = false;
  searchInput.value = "";
};
</script>
