import useAxiosError from "./useAxiosError.js";
import axios from "axios";
import { ref } from "vue";

const useEmailAuth = () => {
	const isLoading = ref(false);
	const axiosError = ref(null);
	const emailLogged = ref(false);
	const vCode = ref(null);

	const verifyEmail = async (email) => {
		try {
			isLoading.value = true;
			//send the data
			await axios("/emails/1");
			//send signal to move to the next form
			emailLogged.value = true;
			isLoading.value = false;
		} catch (err) {
			useAxiosError(err, axiosError, isLoading);
		}
	};

	const verifyEmailCode = async (email) => {
		try {
			isLoading.value = true;
			//send the data
			const { data } = await axios("/emails/1");
			//update local state with code
			vCode.value = data.code;
			//enable the button
			isLoading.value = false;
		} catch (err) {
			useAxiosError(err, axiosError, isLoading);
		}
	};

	return {
		verifyEmail,
		verifyEmailCode,
		emailLogged,
		vCode,
		axiosError,
		isLoading,
	};
};

export default useEmailAuth;
