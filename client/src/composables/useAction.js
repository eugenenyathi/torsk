import useAuth from "./useAuth.js";
import usePagination from "./usePagination";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import axios from "axios";

const useAction = () => {
  const store = useStore();
  const router = useRouter();
  const isLoading = ref(false);
  const { getAuthUser } = useAuth();
  const user = getAuthUser();

  const data = computed(() => store.getters.getTransitData);
  const baseApiRoute = computed(() => store.getters.getBaseApiRoute);

  const { paginate, pagination } = usePagination();

  const deleteEntry = async () => {
    try {
      isLoading.value = true;

      await axios.delete(`/torsk/${data.value.route}/${data.value._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      isLoading.value = false;
      store.dispatch("setShowFlushMessage", {
        state: true,
        action: "deleted",
        context: data.value.context,
      });

      setTimeout(() => {
        store.dispatch("setShowFlushMessage", { state: false });
        navigateToRoute(data.value.route);
        store.commit("closeActionsMenu", false);
      }, 3000);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  //state parameter -> faulty/decommission/in-repair
  const updateAssetState = async (assetState) => {
    let reqBody = {};

    if (assetState.action === "faulty") {
      reqBody["faulty"] = assetState.value;
    } else if (assetState.action === "decommission") {
      reqBody["decommissioned"] = assetState.value;
    }

    try {
      isLoading.value = true;

      const res = await axios.put(
        `/torsk/${data.value.route}/${data.value._id}`,
        reqBody,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      //only send this request when it's an asset state req
      if (data.value.assetStateReq) {
        //make a request to get the whole list of the updated devices
        const updatedDbData = await axios(baseApiRoute.value, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
      }

      isLoading.value = false;

      store.dispatch("setShowFlushMessage", {
        state: true,
        action: assetState.action,
        context: data.value.context,
      });

      setTimeout(() => {
        store.dispatch("setShowFlushMessage", { state: false });
        store.commit("closeActionsMenu", false);

        if (data.value.assetStateReq) {
          //update the db context so that when you change the asset state the faulty/decommissioned route
          //it updates the list also like asset-state>faulty>servers
          store.dispatch("setDbData", []);
          store.commit("setDbData", updatedDbData.data.data);
        }
        //this updates the main routes like device>desktops
        runDeleteEffects(res);
      }, 3000);
    } catch (err) {
      // console.log(err.response.data);
      console.log(err);
    }
  };

  const navigateToRoute = (route) => {
    switch (route) {
      case "remote_desktop":
        router.push("/remote");
        break;
      case "email":
        router.push("/emails");
        break;
      case "software":
        router.push("/software");
        break;
      case "networking/wifi":
        router.push("/networking/wifi");
        break;
      case "telephone":
        router.push("/telephones");
        break;
      default:
        runDeleteEffects();
    }
  };

  const runDeleteEffects = () => {
    //pull transitData;
    const transitData = computed(() => store.getters.getTransitData);
    //pull route data
    const routeData = computed(() => store.getters.getRouteData);
    //remove the old item that was deleted
    const prunedRouteData = routeData.value.filter(
      (data) => data._id != transitData.value._id
    );
    store.dispatch("setRouteData", prunedRouteData);
    //set pagination stuff, this will update the paginated data
    const currentPage = computed(() => store.getters.getCurrentPage);
    pagination(currentPage.value);
    store.dispatch("setCurrentPage", currentPage.value);
    //settings for the pagination bar
    const pageNumbers = paginate(prunedRouteData.length);
    store.dispatch("setPageNumbers", pageNumbers);
  };

  return { isLoading, deleteEntry, updateAssetState };
};

export default useAction;
