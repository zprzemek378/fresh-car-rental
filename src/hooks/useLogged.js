import { useContext } from "react";
import LoggedContext from "../context/LoggedProvider";

const useLogged = () => {
  return useContext(LoggedContext);
};

export default useLogged;
