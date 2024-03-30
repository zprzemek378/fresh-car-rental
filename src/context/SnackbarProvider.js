import { createContext, useState } from "react";

const SnackbarContext = createContext({});

export const SnackbarProvider = ({ children }) => {
  const [snackbarParams, setSnackbarParams] = useState({
    severity: "success",
    text: "",
  });

  return (
    <SnackbarContext.Provider value={{ snackbarParams, setSnackbarParams }}>
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarContext;
