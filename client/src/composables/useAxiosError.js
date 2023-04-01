import { ref } from "vue";

const useAxiosError = (err, axiosError, isLoading) => {
  // console.log("There was an error");
  console.log(err);

  if (err.code === "ERR_NETWORK") {
    axiosError.value = "We could not reach our servers. Please try again";
  } else {
    const {
      response: { data },
    } = err;

    axiosError.value = data.error || data.err;
  }

  isLoading.value = false;
};

export default useAxiosError;
