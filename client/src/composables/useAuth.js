import Cookies from "js-cookie";

const useAuth = () => {
  const setAuthUser = (user) => {
    user = JSON.stringify(user);
    Cookies.set("planet-torsk", user, {
      expires: 14,
      path: "/",
      domain: "localhost",
      sameSite: "strict",
      secure: true,
    });
  };

  const getAuthUser = () => {
    const cookie = Cookies.get("planet-torsk");
    return cookie ? JSON.parse(cookie) : null;
  };

  const deleteAuthUser = () => {
    Cookies.remove("planet-torsk", { path: "/", domain: "localhost" });
  };

  return {
    setAuthUser,
    getAuthUser,
    deleteAuthUser,
  };
};

export default useAuth;
