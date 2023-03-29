<template>
  <section class="main-view">
    <h1>{{ getStoreUser.username }}, Welcome Home</h1>
  </section>
  <table class="devices-table">
    <thead>
      <tr>
        <th>Desktop Name</th>
        <th>User</th>
        <th>OS</th>
        <th>Ms Office</th>
        <th>RAM</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>IT support</td>
        <td>IT Technician</td>
        <td>Windows 10</td>
        <td>Word 2019</td>
        <td>4GB</td>
      </tr>
      <tr>
        <td>Registry</td>
        <td>Registry Officer</td>
        <td>Windows 10</td>
        <td>Word 2013</td>
        <td>4GB</td>
      </tr>
      <tr>
        <td>Creditors</td>
        <td>Creditors Clerk</td>
        <td>Windows 10</td>
        <td>Word 2013</td>
        <td>4GB</td>
      </tr>
      <tr>
        <td>HAdm</td>
        <td>Housing Administrator</td>
        <td>Windows 10</td>
        <td>Word 2010</td>
        <td>6GB</td>
      </tr>
      <tr>
        <td>Roads</td>
        <td>Roads Supervisor</td>
        <td>Windows 10</td>
        <td>Word 2013</td>
        <td>8GB</td>
      </tr>
    </tbody>
  </table>
</template>
<template>
  <table class="tabular">
    <thead>
      <tr>
        <th>
          <input
            type="checkbox"
            class="checkbox"
            @input="$emit('update:modelValue', $event.target.value)"
          />
        </th>
        <th>
          Desktop Name
          <Search class="filter-icon" />
        </th>
        <th>User</th>
        <th>OS</th>
        <th>Ms Office</th>
        <th>RAM</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <input
            type="checkbox"
            class="checkbox"
            @input="$emit('update:modelValue', $event.target.value)"
          />
        </td>
        <td>IT support</td>
        <td>IT Technician</td>
        <td>Windows 10</td>
        <td>Word 2019</td>
        <td>4GB</td>
      </tr>
      <tr>
        <td>
          <input
            type="checkbox"
            class="checkbox"
            @input="$emit('update:modelValue', $event.target.value)"
          />
        </td>
        <td>Registry</td>
        <td>Registry Officer</td>
        <td>Windows 10</td>
        <td>Word 2013</td>
        <td>4GB</td>
      </tr>
      <tr>
        <td>
          <input
            type="checkbox"
            class="checkbox"
            @input="$emit('update:modelValue', $event.target.value)"
          />
        </td>
        <td>Creditors</td>
        <td>Creditors Clerk</td>
        <td>Windows 10</td>
        <td>Word 2013</td>
        <td>4GB</td>
      </tr>
      <tr>
        <td>
          <input
            type="checkbox"
            class="checkbox"
            @input="$emit('update:modelValue', $event.target.value)"
          />
        </td>
        <td>HAdm</td>
        <td>Housing Administrator</td>
        <td>Windows 10</td>
        <td>Word 2010</td>
        <td>6GB</td>
      </tr>
      <tr>
        <td>
          <input
            type="checkbox"
            class="checkbox"
            @input="$emit('update:modelValue', $event.target.value)"
          />
        </td>
        <td>Roads</td>
        <td>Roads Supervisor</td>
        <td>Windows 10</td>
        <td>Word 2013</td>
        <td>8GB</td>
      </tr>
    </tbody>
  </table>
</template>

<ul class="action-ul-wrapper">
        <li class="list-item">
          <router-link to="/specs">
            <List class="icon" />
            Specs
          </router-link>
        </li>
        <li class="list-item">
          <router-link to="">
            <Update class="icon" />
            Update
          </router-link>
        </li>
        <li class="list-item">
          <router-link to="">
            <ProgressWrench class="icon" />
            Repair
          </router-link>
        </li>
        <li class="list-item">
          <router-link to="">
            <HelpCircle class="icon" />
            Faulty
          </router-link>
        </li>
        <li class="list-item">
          <router-link to="">
            <ArchiveOutline class="icon" />
            Decommission
          </router-link>
        </li>
        <li class="list-item">
          <router-link to="">
            <Close class="icon" />
            Dead
          </router-link>
        </li>
        <li class="list-item">
          <router-link to="">
            <Trash class="icon" />
            Delete
          </router-link>
        </li>
      </ul>

<template>
  <section class="position-container" v-if="!showAddEntry.devices">
    <SelectionBar :routes="routes" />
    <router-view />
  </section>

  <router-view v-else />
</template>

<script setup>
//components
import SelectionBar from "../../components/SelectionBar.vue";

import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const addEntryActive = ref(false);

const showAddEntry = computed(() => store.getters.showAddEntry);

//if the devices is true and the router view hasn't changed then
//show form to add a new device.
if (showAddEntry.value.devices && !showAddEntry.value.routerView) {
  store.dispatch("setShowAddEntry", {
    ...showAddEntry.value,
    devices: false,
  });

  addEntryActive.value = true;
} else {
  store.dispatch("setShowAddEntry", {
    ...showAddEntry.value,
    routerView: false,
  });
  addEntryActive.value = false;
}

console.log(addEntryActive.value);

const routes = ref([
  {
    path: "/devices/desktops",
    name: "Desktops",
  },
  {
    path: "/devices/laptops",
    name: "Laptops",
  },
  {
    path: "/devices/tablets",
    name: "Tablets",
  },
  {
    path: "/devices/cellphones",
    name: "Phones",
  },
]);

{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
</script>
