import useAuth from "./useAuth.js";

const useRoute = () => {
  const { getAuthUser } = useAuth();

  const closeRoute = (to, from, next) => {
    let isAuthenticated = getAuthUser();
    if (isAuthenticated) next();
    else next("/login");
  };

  const redirectRoute = (to, from, next) => {
    let isAuthenticated = getAuthUser();
    if (isAuthenticated) next("/");
    else next();
  };

  const redirectUser = (to, from, next) => {
    let isAuthenticated = getAuthUser();
    if (isAuthenticated) next();
    else next("/login");
  };

  return {
    closeRoute,
    redirectRoute,
    redirectUser,
  };
};

export default useRoute;
