import axios from "axios";
import useAxiosError from "./useAxiosError.js";
import useAuth from "./useAuth";

import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";

const useLogin = () => {
  const isLoading = ref(false);
  const axiosError = ref(null);
  const store = useStore();
  const router = useRouter();
  const { setAuthUser, getAuthUser } = useAuth();

  const login = async (username, password) => {
    isLoading.value = true;
    try {
      //send data
      const { data: user } = await axios("/users/1");
      //update global status
      store.dispatch("login", user);
      //update cookies
      setAuthUser(user);
      //enable the login btn
      isLoading.value = false;
      //redirect to home/dashboard route
      router.push({ name: "Dashboard" });
    } catch (err) {
      useAxiosError(err, axiosError, isLoading);
    }
  };

  const loggedIn = () => {
    const user = getAuthUser();

    if (user) {
      store.dispatch("login", user);
      return computed(() => store.getters.getUser);
    }
  };

  return { isLoading, axiosError, login, loggedIn };
};

export default useLogin;
