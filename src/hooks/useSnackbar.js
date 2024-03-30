import { useContext } from "react";
import SnackbarContext from "../context/SnackbarProvider";

const useSnackbar = () => {
  return useContext(SnackbarContext);
};

export default useSnackbar;
