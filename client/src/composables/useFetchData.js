import axios from "axios";
import useAuth from "./useAuth.js";
import useAxiosError from "./useAxiosError.js";

import { useStore } from "vuex";
import { ref, computed } from "vue";

const useFetchData = () => {
  const isLoading = ref(true);
  const axiosError = ref(null);
  const store = useStore();
  const { getAuthUser } = useAuth();
  const user = getAuthUser();

  const fetchData = async (apiRoute, showEditBtn = true) => {
    try {
      isLoading.value = true;
      //fetch data
      const {
        data: { data },
      } = await axios(`${apiRoute}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      //first clear any pre-existing data to remove possible pagination errors
      store.dispatch("flushRouteData");
      store.dispatch("setRouteData", []);
      store.dispatch("setPageNumbers", []);
      store.dispatch("setDbData", data);

      if (showEditBtn) store.dispatch("switchHeaderBtn", { showEditBtn: true });

      isLoading.value = false;
    } catch (err) {
      console.log(err);
      isLoading.value = false;
      useAxiosError(err, axiosError, isLoading);
    }
  };

  const fetchConfig = async (apiRoute, showEditBtn = true) => {
    try {
      isLoading.value = true;
      //fetch data
      const {
        data: { data },
      } = await axios(`${apiRoute}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      //first clear any pre-existing data to remove possible pagination errors
      store.dispatch("flushRouteData");
      store.dispatch("setRouteData", []);
      store.dispatch("setPageNumbers", []);
      store.dispatch("setDbData", data);

      if (showEditBtn) store.dispatch("switchHeaderBtn", { showEditBtn: true });

      isLoading.value = false;
    } catch (err) {
      console.log(err);
      isLoading.value = false;
      useAxiosError(err, axiosError, isLoading);
    }
  };

  return { isLoading, axiosError, fetchData };
};

export default useFetchData;
