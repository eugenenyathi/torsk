import useAuth from "./useAuth.js";
import useLogin from "./useLogin.js";

const useRoute = () => {
  const { getAuthUser } = useAuth();
  const { userExists, checkUser } = useLogin();

  const closeRoute = (to, from, next) => {
    let isAuthenticated = getAuthUser();
    if (isAuthenticated) next();
    else next("/login");
  };

  const closeSignup = (to, from, next) => {
    let isAuthenticated = getAuthUser();
    checkUser();

    if (isAuthenticated) next("/");
    else if (userExists.value) next("/login");
    else next();
  };

  const redirectRoute = (to, from, next) => {
    let isAuthenticated = getAuthUser();
    if (isAuthenticated) next("/");
    else next();
  };

  const redirectUser = (to, from, next) => {
    let isAuthenticated = getAuthUser();
    checkUser();

    if (isAuthenticated) next("/");
    else if (!userExists.value) next("/signup");
    else next("/login");
  };

  return {
    closeRoute,
    closeSignup,
    redirectRoute,
    redirectUser,
  };
};

export default useRoute;
