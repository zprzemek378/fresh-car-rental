import { useState } from "react";
import "./authorise-styles.css";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ResertPasswordPage from "./ResertPasswordPage";

import Account from "./Account";
import useLogged from "../../hooks/useLogged";

interface AuthoriseProps {
  setBackgroundImage: (imagePath: string) => void;
}

const Authorise: React.FC<AuthoriseProps> = ({ setBackgroundImage }) => {
  setBackgroundImage("logging");
  const [page, setPage] = useState(0);

  // @ts-ignore
  const { logged } = useLogged();

  return (
    <div>
      {logged ? (
        <Account />
      ) : page === 0 ? (
        <LoginPage setPage={setPage} />
      ) : page === 1 ? (
        <RegisterPage setPage={setPage} />
      ) : (
        <ResertPasswordPage setPage={setPage} />
      )}
    </div>
  );
};

export default Authorise;
