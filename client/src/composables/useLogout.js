import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useAuth from "./useAuth.js";

const useLogout = () => {
	const store = useStore();
	const router = useRouter();
	const { deleteAuthUser } = useAuth();

	const logout = () => {
		//delete cookie
		deleteAuthUser();
		//update global state
		store.dispatch("logout");
		//redirect to login
		router.push({ name: "Login" });
	};

	return { logout };
};

export default useLogout;
