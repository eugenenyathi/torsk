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
  Emails,
} from "../views/Home/";

import Manifesto from "@/components/Manifesto";

//Devices Routes
import DevicesRoutes from "@/components/Devices/DevicesRoutes.vue";
//Office Equipment Routes
import OfficeEquipRoutes from "@/components/OfficeEquipment/OfficeEquipRoutes.vue";
//Networking Routes
import NetworkingRoutes from "@/components/Networking/NetworkingRoutes.vue";
//Emails Routes
import EmailsRoutes from "@/components/Emails/EmailsRoutes.vue";
//Faulty State Routes
import AssetStateRoutes from "@/components/Dashboard/AssetStateRoutes.vue";
import ASChildRoutes from "@/components/Dashboard/ASChildRoutes.vue";

//interface files
import AssetState from "@/components/Dashboard/AssetState.vue";

//Files to with adding a new device
import AddServer from "@/components/AddRecord/Choices/AddServer.vue";
import AddComputer from "@/components/AddRecord/Choices/AddMachine.vue";
import AddUPS from "@/components/AddRecord/Choices/AddUPS.vue";
import AddMobile from "@/components/AddRecord/Choices/AddMobile.vue";
import AddPrinter from "@/components/AddRecord/Choices/AddPrinter.vue";
import AddScanner from "@/components/AddRecord/Choices/AddScanner.vue";
import AddRouter from "@/components/AddRecord/Choices/AddRouter.vue";
import AddSwitch from "@/components/AddRecord/Choices/AddSwitch.vue";
import AddConverter from "@/components/AddRecord/Choices/AddConverter.vue";
import AddWiFi from "@/components/AddRecord/Choices/AddWiFi.vue";
import AddNetworkConfig from "@/components/AddRecord/Choices/AddNetworkConfig.vue";

import AddTelephone from "@/components/AddRecord/Choices/AddTelephone.vue";
import AddRemoteDesktop from "@/components/AddRecord/Choices/AddRemoteDesktop.vue";
import AddEmail from "@/components/AddRecord/Choices/AddEmail.vue";
import AddEmailConfig from "@/components/AddRecord/Choices/AddEmailConfig.vue";
import AddSoftware from "@/components/AddRecord/Choices/AddSoftware.vue";

//Files to do with editing
import EditTelephone from "@/components/Action/EditTelephone.vue";
import EditRemoteDesktop from "@/components/Action/EditRemoteDesktop.vue";
import EditEmail from "@/components/Action/EditEmail.vue";
import EditEmailConfig from "@/components/Action/EditEmailConfig.vue";
import EditNetworkConfig from "@/components/Action/EditNetworkConfig.vue";
import EditSoftware from "@/components/Action/EditSoftware.vue";
import EditWiFi from "@/components/Action/EditWiFi.vue";

//composables
import useRoute from "@/composables/useRoute.js";
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
        path: "/dashboard/faulty",
        component: AssetState,
        name: "Faulty",
        children: [
          {
            path: "devices",
            component: AssetStateRoutes,
            name: "Faulty-Devices",
          },
          {
            path: "office-equipment",
            component: AssetStateRoutes,
            name: "Faulty-OfficeEquipment",
          },
          {
            path: "networking",
            component: AssetStateRoutes,
            name: "Faulty-NetworkingDevices",
          },
          {
            path: "telephones",
            component: AssetStateRoutes,
            name: "Faulty-Telephones",
          },
          {
            path: "devices/servers",
            component: ASChildRoutes,
            name: "Faulty-Servers",
          },
          {
            path: "devices/desktops",
            component: ASChildRoutes,
            name: "Faulty-Desktops",
          },
          {
            path: "devices/laptops",
            component: ASChildRoutes,
            name: "Faulty-Laptops",
          },
          {
            path: "devices/ups",
            component: ASChildRoutes,
            name: "Faulty-Ups",
          },
          {
            path: "devices/tablets",
            component: ASChildRoutes,
            name: "Faulty-Tablets",
          },
          {
            path: "devices/cellphones",
            component: ASChildRoutes,
            name: "Faulty-Cellphones",
          },
          {
            path: "office-equipment/printers",
            component: ASChildRoutes,
            name: "Faulty-Printers",
          },
          {
            path: "office-equipment/scanners",
            component: ASChildRoutes,
            name: "Faulty-Scanners",
          },
          {
            path: "networking/routers",
            component: ASChildRoutes,
            name: "Faulty-Routers",
          },
          {
            path: "networking/switches",
            component: ASChildRoutes,
            name: "Faulty-Switches",
          },
          {
            path: "networking/converters",
            component: ASChildRoutes,
            name: "Faulty-Converters",
          },
        ],
      },
      {
        path: "/dashboard/decommissioned",
        component: AssetState,
        name: "Decommissioned",
        children: [
          {
            path: "devices",
            component: AssetStateRoutes,
            name: "Decommissioned-Devices",
          },
          {
            path: "office-equipment",
            component: AssetStateRoutes,
            name: "Decommissioned-OfficeEquipment",
          },
          {
            path: "networking",
            component: AssetStateRoutes,
            name: "Decommissioned-NetworkingDevices",
          },
          {
            path: "telephones",
            component: AssetStateRoutes,
            name: "Decommissioned-Telephones",
          },
          {
            path: "devices/servers",
            component: ASChildRoutes,
            name: "Decommissioned-Servers",
          },
          {
            path: "devices/desktops",
            component: ASChildRoutes,
            name: "Decommissioned-Desktops",
          },
          {
            path: "devices/laptops",
            component: ASChildRoutes,
            name: "Decommissioned-Laptops",
          },
          {
            path: "devices/ups",
            component: ASChildRoutes,
            name: "Decommissioned-Ups",
          },
          {
            path: "devices/tablets",
            component: ASChildRoutes,
            name: "Decommissioned-Tablets",
          },
          {
            path: "devices/cellphones",
            component: ASChildRoutes,
            name: "Decommissioned-Cellphones",
          },
          {
            path: "office-equipment/printers",
            component: ASChildRoutes,
            name: "Decommissioned-Printers",
          },
          {
            path: "office-equipment/scanners",
            component: ASChildRoutes,
            name: "Decommissioned-Scanners",
          },
          {
            path: "networking/routers",
            component: ASChildRoutes,
            name: "Decommissioned-Routers",
          },
          {
            path: "networking/switches",
            component: ASChildRoutes,
            name: "Decommissioned-Switches",
          },
          {
            path: "networking/converters",
            component: ASChildRoutes,
            name: "Decommissioned-Converters",
          },
        ],
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
            path: "ups",
            component: DevicesRoutes,
            name: "UPSuppliers",
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
          {
            path: "config",
            component: NetworkingRoutes,
            name: "NetworkConfig",
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
        component: Emails,
        name: "Emails",
        children: [
          {
            path: "list",
            component: EmailsRoutes,
            name: "EmailList",
          },
          {
            path: "config",
            component: EmailsRoutes,
            name: "EmailConfig",
          },
        ],
      },
      {
        path: "emails/edit/:id",
        component: EditEmail,
      },
      {
        path: "emails/config/add/",
        component: AddEmailConfig,
      },
      {
        path: "emails/config/edit/",
        component: EditEmailConfig,
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
        path: "/devices/ups/add",
        component: AddUPS,
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
        path: "networking/config/add/",
        component: AddNetworkConfig,
      },
      {
        path: "networking/config/edit/",
        component: EditNetworkConfig,
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
    // beforeEnter: redirectRoute,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URl),
  routes,
});

export default router;
