import axios from "axios";
import useAxiosError from "./useAxiosError.js";

import { useStore } from "vuex";
import { ref, computed } from "vue";

const useFetch = () => {
  const isLoading = ref(true);
  const axiosError = ref(null);
  const store = useStore();
  const localData = ref([]);

  const fetchData = async (apiRoute) => {
    try {
      isLoading.value = true;
      //fetch data
      // const {
      //   data: { data },
      // } = await axios(`${apiRoute}`);
      const res = await axios(`${apiRoute}`);
      isLoading.value = false;

      return res.data.data;
    } catch (err) {
      console.log(err);
      useAxiosError(err, axiosError, isLoading);
    }
  };

  return { isLoading, axiosError, fetchData };
};

export default useFetch;
