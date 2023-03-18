import Cookies from "js-cookie";

const useAuth = () => {
	const setAuthUser = (user) => {
		user = JSON.stringify(user);
		Cookies.set("planet-krynn", user, {
			expires: 14,
			path: "/",
			domain: "localhost",
			sameSite: "strict",
			secure: true,
		});
	};

	const getAuthUser = () => {
		const cookie = Cookies.get("planet-krynn");
		return cookie ? JSON.parse(cookie) : null;
	};

	const deleteAuthUser = () => {
		Cookies.remove("planet-krynn", { path: "/", domain: "localhost" });
	};

	return {
		setAuthUser,
		getAuthUser,
		deleteAuthUser,
	};
};

export default useAuth;
