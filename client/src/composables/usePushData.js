import useAuth from "./useAuth.js";
import axios from "axios";
import useAxiosError from "./useAxiosError.js";
import usePagination from "./usePagination";

import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";

const usePushData = () => {
  const isLoading = ref(false);
  const axiosError = ref(null);
  const store = useStore();
  const router = useRouter();
  const { getAuthUser } = useAuth();
  const user = getAuthUser();

  const context = computed(() => store.getters.getFlushMessageContext);
  const { paginate, pagination } = usePagination();

  const postData = async (vueRoute, apiRoute) => {
    const formData = computed(() => store.getters.getTransitFormData);
    isLoading.value = true;

    try {
      //send data
      const { data } = await axios.post(
        apiRoute,
        { ...formData.value },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      store.dispatch("setShowFlushMessage", {
        state: true,
        action: "added",
        context: context.value,
      });

      isLoading.value = false;

      setTimeout(() => {
        store.dispatch("setShowFlushMessage", { state: false });
        store.dispatch("setCurrentPage", 1);
        router.push(vueRoute);
      }, 3000);
    } catch (err) {
      useAxiosError(err, axiosError, isLoading);
    }
  };

  const putData = async (apiRoute, vueRoute = false) => {
    const formData = computed(() => store.getters.getTransitFormData);
    isLoading.value = true;

    try {
      //send data
      const res = await axios.put(
        apiRoute,
        { ...formData.value },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      store.dispatch("setShowFlushMessage", {
        state: true,
        action: "updated",
        context: context.value,
      });

      //update global status
      isLoading.value = false;

      setTimeout(() => {
        store.dispatch("setShowFlushMessage", { state: false });
        if (vueRoute) router.push(vueRoute);
        else runUpdateEffects(res);
      }, 3000);
    } catch (err) {
      useAxiosError(err, axiosError, isLoading);
    }
  };

  const runUpdateEffects = (res) => {
    //pull transitData;
    const transitData = computed(() => store.getters.getTransitData);
    //pull route data
    const routeData = computed(() => store.getters.getRouteData);
    //remove the old item that was updated
    const prunedRouteData = routeData.value.filter(
      (data) => data._id != transitData.value._id
    );
    //add the new updated item
    const updatedRouteData = [res.data.data, ...prunedRouteData];
    //then update the global state
    store.dispatch("setRouteData", updatedRouteData);
    store.dispatch("setRouteBackUpData", updatedRouteData);
    //set pagination stuff, this will update the paginated data
    pagination();
    store.dispatch("setCurrentPage", 1);
    //settings for the pagination bar
    const pageNumbers = paginate(updatedRouteData.length);
    store.dispatch("setPageNumbers", pageNumbers);
    store.dispatch("closeActionsMenu", false);
  };

  return { isLoading, axiosError, postData, putData, runUpdateEffects };
};

export default usePushData;
