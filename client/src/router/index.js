import { createRouter, createWebHistory } from "vue-router";
//root views
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Logout from "../views/Logout.vue";
import NotFound from "../views/NotFound.vue";

import {
  Dashboard,
  Devices,
  Networking,
  OfficeEquipment,
  Company,
  UserProfile,
  UserSettings,
} from "../views/Home/";

import Manifesto from "@/components/Manifesto";

//Devices Routes
import DevicesRoutes from "../components/Devices/DevicesRoutes.vue";
//Office Equipment Routes
import OfficeEquipRoutes from "../components/OfficeEquipment/OfficeEquipRoutes.vue";
//Networking Routes
import NetworkingRoutes from "../components/Networking/NetworkingRoutes.vue";

//Files to with adding a new device
import AddServer from "../components/AddRecord/Choices/AddServer.vue";
import AddComputer from "../components/AddRecord/Choices/AddMachine.vue";
import AddMobile from "../components/AddRecord/Choices/AddMobile.vue";
import AddPrinter from "../components/AddRecord/Choices/AddPrinter.vue";
import AddScanner from "../components/AddRecord/Choices/AddScanner.vue";
import AddRouter from "../components/AddRecord/Choices/AddRouter.vue";
import AddSwitch from "../components/AddRecord/Choices/AddSwitch.vue";
import AddConverter from "../components/AddRecord/Choices/AddConverter.vue";
import AddWiFi from "../components/AddRecord/Choices/AddWiFi.vue";

import AddTelephone from "../components/AddRecord/Choices/AddTelephone.vue";
import AddRemoteDesktop from "../components/AddRecord/Choices/AddRemoteDesktop.vue";
import AddEmail from "../components/AddRecord/Choices/AddEmail.vue";
import AddSoftware from "../components/AddRecord/Choices/AddSoftware.vue";

//Files to do with editing
import EditTelephone from "../components/Action/EditTelephone.vue";
import EditRemoteDesktop from "../components/Action/EditRemoteDesktop.vue";
import EditEmail from "../components/Action/EditEmail.vue";
import EditSoftware from "../components/Action/EditSoftware.vue";
import EditWiFi from "../components/Action/EditWiFi.vue";

//composables
import useRoute from "../composables/useRoute.js";
const { redirectRoute, closeRoute } = useRoute();

//TODO split this router file

const routes = [
  {
    path: "/",
    component: Home,
    name: "Home",
    beforeEnter: closeRoute,
    children: [
      {
        path: "/",
        component: Dashboard,
        name: "Dashboard",
      },
      {
        path: "devices",
        component: Devices,
        name: "Devices",
        children: [
          {
            path: "servers",
            component: DevicesRoutes,
            name: "Servers",
          },
          {
            path: "desktops",
            component: DevicesRoutes,
            name: "Desktops",
          },
          {
            path: "laptops",
            component: DevicesRoutes,
            name: "Laptops",
          },
          {
            path: "tablets",
            component: DevicesRoutes,
            name: "Tablets",
          },
          {
            path: "cellphones",
            component: DevicesRoutes,
            name: "Cellphones",
          },
        ],
      },
      {
        path: "office-equipment",
        component: OfficeEquipment,
        name: "Office Equipment",
        children: [
          {
            path: "printers",
            component: OfficeEquipRoutes,
            name: "Printers",
          },
          {
            path: "scanners",
            component: OfficeEquipRoutes,
            name: "Scanners",
          },
        ],
      },
      {
        path: "networking",
        component: Networking,
        name: "Networking",
        children: [
          {
            path: "routers",
            component: NetworkingRoutes,
            name: "Routers",
          },
          {
            path: "switches",
            component: NetworkingRoutes,
            name: "Switches",
          },
          {
            path: "converters",
            component: NetworkingRoutes,
            name: "Converters",
          },
          {
            path: "wifi",
            component: NetworkingRoutes,
            name: "WiFi",
          },
        ],
      },
      {
        path: "remote",
        component: Manifesto,
        name: "Remote Desktop",
      },
      {
        path: "remote/add",
        component: AddRemoteDesktop,
      },
      {
        path: "remote/:id",
        component: EditRemoteDesktop,
      },
      {
        path: "telephones",
        component: Manifesto,
        name: "Telephones",
      },
      {
        path: "telephones/:id",
        component: EditTelephone,
      },
      {
        path: "emails",
        component: Manifesto,
        name: "Emails",
      },
      {
        path: "emails/:id",
        component: EditEmail,
      },
      {
        path: "software",
        component: Manifesto,
        name: "Software",
      },
      {
        path: "software/:id",
        component: EditSoftware,
      },
      {
        path: "/devices/servers/add",
        component: AddServer,
      },
      {
        path: "/devices/desktops/add",
        component: AddComputer,
      },
      {
        path: "/devices/laptops/add",
        component: AddComputer,
      },
      {
        path: "/devices/tablets/add",
        component: AddMobile,
      },
      {
        path: "/devices/cellphones/add",
        component: AddMobile,
      },
      {
        path: "/office-equipment/printers/add",
        component: AddPrinter,
      },
      {
        path: "/office-equipment/scanners/add",
        component: AddScanner,
      },
      {
        path: "/networking/routers/add",
        component: AddRouter,
      },
      {
        path: "/networking/switches/add",
        component: AddSwitch,
      },
      {
        path: "/networking/converters/add",
        component: AddConverter,
      },
      {
        path: "/networking/wifi/add",
        component: AddWiFi,
      },
      {
        path: "/networking/wifi/:id",
        component: EditWiFi,
      },
      {
        path: "telephones/add",
        component: AddTelephone,
      },
      {
        path: "emails/add",
        component: AddEmail,
      },
      {
        path: "software/add",
        component: AddSoftware,
      },
      {
        path: "about",
        component: Company,
        name: "About",
      },
      {
        path: "user_profile",
        component: UserProfile,
        name: "Profile",
      },
      {
        path: "user_settings",
        component: UserSettings,
        name: "Settings",
      },
      {
        path: "logout",
        component: Logout,
        name: "Logout",
      },
    ],
  },

  {
    path: "/login",
    component: Login,
    name: "Login",
    beforeEnter: redirectRoute,
  },

  {
    path: "/signup",
    component: Signup,
    name: "Signup",
    beforeEnter: redirectRoute,
  },

  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
    beforeEnter: redirectRoute,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URl),
  routes,
});

export default router;
