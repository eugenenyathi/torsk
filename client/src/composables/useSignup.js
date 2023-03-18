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

	const signup = async (userInfo) => {
		try {
			isLoading.value = true;

			const { data: user } = await axios("/users/1");
			//update global state
			store.dispatch("login", user);
			//update cookies
			setAuthUser(user);

			isLoading.value = false;

			return user;
		} catch (err) {
			useAxiosError(err, axiosError, isLoading);
		}
	};

	const rootPassword = async (password) => {
		try {
			isLoading.value = true;

			await axios("/users/1");

			//redirect to the home/dashboard route
			router.push({ name: "Dashboard" });
		} catch (err) {
			useAxiosError(err, axiosError, isLoading);
		}
	};

	return {
		axiosError,
		isLoading,
		signup,
		rootPassword,
	};
};

export default useSignup;
