import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useSnackbar from "../hooks/useSnackbar";

const LoggedContext = createContext({});

export const LoggedProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);

  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const { setSnackbarParams } = useSnackbar();

  const controller = new AbortController();

  const checkIfIsLoggedIn = async () => {
    try {
      const response = await axiosPrivate.get("/loggedIn", {
        signal: controller.signal,
      });

      if (response.data.loggedIn !== undefined) {
        setLogged(response.data.loggedIn);
      } else {
        setLogged((prev) => {
          if (prev) {
            setSnackbarParams({ severity: "warning", text: "Token expired!" });
          }

          return false;
        });
      }
    } catch (err) {
      setLogged((prev) => {
        if (prev) {
          setSnackbarParams({ severity: "warning", text: "Token expired!" });
        }

        return false;
      });
    }
  };

  useEffect(() => {
    const intervalId = setInterval(async () => {
      checkIfIsLoggedIn();
    }, 7000);

    return () => clearInterval(intervalId);
  }, [auth]);

  return (
    <LoggedContext.Provider value={{ logged, setLogged, checkIfIsLoggedIn }}>
      {children}
    </LoggedContext.Provider>
  );
};

export default LoggedContext;
