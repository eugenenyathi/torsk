<template>
  <aside class="sidebar-wrapper">
    <header class="sidebar-header">
      <router-link to="/">Torsk</router-link>
    </header>
    <div class="menu-wrapper">
      <ul class="menu-ul-wrapper">
        <li class="menu-link">
          <router-link to="/">
            <Dashboard class="icon" />
            Dashboard
          </router-link>
        </li>
        <li class="menu-link">
          <router-link
            to="/devices/desktops"
            :class="{
              'parent-link-exact-active': subIsActive('/devices'),
            }"
          >
            <Devices class="icon" />
            Devices
          </router-link>
        </li>
        <li class="menu-link">
          <router-link
            to="/office-equipment/printers"
            :class="{
              'parent-link-exact-active': subIsActive('/office-equipment'),
            }"
          >
            <Printer class="icon" />
            Office Equipment
          </router-link>
        </li>
        <li class="menu-link">
          <router-link
            to="/networking/routers"
            :class="{
              'parent-link-exact-active': subIsActive('/networking'),
            }"
          >
            <Lan class="icon" />
            Networking
          </router-link>
        </li>
        <li class="menu-link">
          <router-link
            to="/remote"
            :class="{
              'parent-link-exact-active': subIsActive('/remote'),
            }"
          >
            <RemoteDesktop class="icon" />
            Anydesk
          </router-link>
        </li>
        <li class="menu-link">
          <router-link
            to="/emails"
            :class="{
              'parent-link-exact-active': subIsActive('/emails'),
            }"
          >
            <Email class="icon" />
            Emails
          </router-link>
        </li>
        <li class="menu-link">
          <router-link
            to="/software"
            :class="{
              'parent-link-exact-active': subIsActive('/software'),
            }"
          >
            <CodeBrackets class="icon" />
            Software
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
//icons
import Dashboard from "vue-material-design-icons/HomeOutline.vue";
import DashboardAlt from "vue-material-design-icons/Home.vue";
import Devices from "vue-material-design-icons/Monitor.vue";
import Printer from "vue-material-design-icons/PrinterOutline.vue";
import PrinterAlt from "vue-material-design-icons/Printer.vue";
import RemoteDesktop from "vue-material-design-icons/RemoteDesktop.vue";
import Lan from "vue-material-design-icons/Lan.vue";
import LanAlt from "vue-material-design-icons/LanConnect.vue";
import Email from "vue-material-design-icons/EmailOutline.vue";
import EmailAlt from "vue-material-design-icons/Email.vue";
import Settings from "vue-material-design-icons/CogOutline.vue";
import SettingsAlt from "vue-material-design-icons/Cog.vue";
import CodeBrackets from "vue-material-design-icons/CodeBrackets.vue";
import Users from "vue-material-design-icons/AccountMultiple.vue";

import ActiveChildRoute from "../helpers/ActiveChildRoute.js";
const { subIsActive } = ActiveChildRoute();
</script>
