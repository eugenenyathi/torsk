import axios from "axios";
import useAxiosError from "./useAxiosError.js";

import { useStore } from "vuex";
import { ref, computed } from "vue";

const useFetchData = () => {
  const isLoading = ref(true);
  const axiosError = ref(null);
  const store = useStore();

  const fetchData = async (apiRoute, showEditBtn = true) => {
    try {
      isLoading.value = true;
      //fetch data
      const {
        data: { data },
      } = await axios(`${apiRoute}`);

      if (Object.keys(data).length > 0) {
        // console.log(data);
        //first clear any pre-existing data to remove possible pagination errors
        store.dispatch("flushRouteData");
        store.dispatch("setRouteData", []);
        store.dispatch("setPageNumbers", []);

        if (showEditBtn)
          store.dispatch("switchHeaderBtn", { showEditBtn: true });
        store.dispatch("setDbData", data);
      }

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
