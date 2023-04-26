import useAuth from "./useAuth.js";
import axios from "axios";

const useRoute = () => {
  const { getAuthUser } = useAuth();

  const closeRoute = (to, from, next) => {
    let isAuthenticated = getAuthUser();

    if (isAuthenticated) next();
    else next("/login");
  };

  const redirectUser = async (to, from, next) => {
    const { data } = await axios("/auth/status");
    let isAuthenticated = getAuthUser();

    if (isAuthenticated) next("/");
    else if (!data) next("/signup");
    else next();
  };

  const closeSignup = async (to, from, next) => {
    const { data } = await axios("/auth/status");
    let isAuthenticated = getAuthUser();

    if (isAuthenticated) next("/");
    else if (data) next("/login");
    else next();
  };

  return {
    closeRoute,
    closeSignup,
    redirectUser,
  };
};

export default useRoute;
