import axios from "axios";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useAuth from "../composables/useAuth.js";
import useAxiosError from "../composables/useAxiosError.js";

const useResetPassword = () => {
  const isLoading = ref(false);
  const axiosError = ref(null);
  const store = useStore();
  const router = useRouter();
  const { setAuthUser } = useAuth();

  const user = computed(() => store.getters.getUser);
  const { email } = user.value;

  const resetPwd = async (password) => {
    try {
      isLoading.value = true;
      const { data: user } = await axios("/user", {
        email,
        password,
      });
      //update global state
      store.dispatch("login", user);
      //update cookies
      setAuthUser(user);
      //redirect to home
      router.push({ name: "Dashboard" });
    } catch (err) {
      useAxiosError(err, axiosError, isLoading);
    }
  };

  const updatePwd = async (password) => {
    try {
      isLoading.value = true;
      const { data: user } = await axios("/user", {
        email,
        password,
      });
      //update global state
      store.dispatch("login", user);
      //update cookies
      setAuthUser(user);
      //redirect to home
      router.push({ name: "Dashboard" });
    } catch (err) {
      useAxiosError(err, axiosError, isLoading);
    }
  };

  return {
    axiosError,
    isLoading,
    resetPwd,
    updatePwd,
  };
};

export default useResetPassword;
