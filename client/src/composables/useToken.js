import useAuth from "./useAuth.js";

const useToken = () => {
  const { getAuthUser } = useAuth();
  const user = getAuthUser();
  // console.log(user);
  return user ? user.token : "";
};

export default useToken;
