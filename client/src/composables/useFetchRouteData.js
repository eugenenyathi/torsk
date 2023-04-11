import axios from "axios";
import useAxiosError from "./useAxiosError.js";
import usePagination from "./usePagination";

import { useStore } from "vuex";
import { ref, computed } from "vue";

const useFetchRouteData = () => {
  const isLoading = ref(true);
  const axiosError = ref(null);
  const store = useStore();

  const { paginate, pagination } = usePagination();

  const fetchRouteData = async (anchor = "") => {
    const baseApiRoute = computed(() => store.getters.getBaseApiRoute);
    try {
      isLoading.value = true;
      //fetch data
      const {
        data: { data },
      } = await axios(`${baseApiRoute.value}/${anchor}`);

      //first clear any pre-existing data
      store.dispatch("flushRouteData");
      store.dispatch("setRouteData", data);
      //backup the route data for search manipulation
      store.dispatch("setRouteBackUpData", data);
      //set pagination stuff, this will update the paginated data
      pagination();
      store.dispatch("setCurrentPage", 1);
      //settings for the pagination bar
      const pageNumbers = paginate(data.length);
      store.dispatch("setPageNumbers", pageNumbers);

      isLoading.value = false;
    } catch (err) {
      console.log(err);
      useAxiosError(err, axiosError, isLoading);
    }
  };

  return { isLoading, axiosError, fetchRouteData };
};

export default useFetchRouteData;
