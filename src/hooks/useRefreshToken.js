import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axios.get("/refreshToken", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const email = response.data.email;
      const accessToken = response.data.accessToken;
      const roles = response.data.roles; //should be an array
      const firstname = response.data.firstname;
      const lastname = response.data.lastname;
      setAuth({ email, roles, accessToken, firstname, lastname });
      return response.data.accessToken;
    } catch (err) {
      console.log("BLAD Z SERWERA: ", err);
    }
  };

  return refresh;
};

export default useRefreshToken;
