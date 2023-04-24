import axios from "axios";
import useAuth from "./useAuth";
import useAxiosError from "./useAxiosError";

import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const useSignup = () => {
  const isLoading = ref(false);
  const axiosError = ref(null);
  const store = useStore();
  const router = useRouter();
  const { setAuthUser } = useAuth();

  const signup = async (data) => {
    try {
      isLoading.value = true;
      //send data
      const { data: user } = await axios.post("/auth/register", data);
      //update global status
      store.dispatch("login", user);
      //update cookies
      setAuthUser(user);
      //enable the signup btn
      isLoading.value = false;
      //redirect to home/dashboard route
      router.push({ name: "Dashboard" });
    } catch (err) {
      useAxiosError(err, axiosError, isLoading);
    }
  };

  return {
    axiosError,
    isLoading,
    signup,
  };
};

export default useSignup;
