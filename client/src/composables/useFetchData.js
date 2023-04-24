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
      //get the dbData to it's default state
      store.dispatch("setDbData", {});

      if (
        Object.keys(data).length > 0 &&
        Object.getPrototypeOf(data) === Object.prototype
      ) {
        if (showEditBtn)
          store.dispatch("switchHeaderBtn", {
            showEditBtn: true,
            showAddBtn: false,
            showDeleteBtn: false,
          });
        store.dispatch("setDbData", data);
      }

      isLoading.value = false;
    } catch (err) {
      console.log(err);
      isLoading.value = false;
      useAxiosError(err, axiosError, isLoading);
    }
  };

  return { isLoading, axiosError, fetchData, fetchConfig };
};

export default useFetchData;
