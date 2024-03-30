import { useEffect, useRef, useState } from "react";
import { HiLogin } from "react-icons/hi";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import useLogged from "../../hooks/useLogged";
import { BiCheckboxChecked } from "react-icons/bi";
import useSnackbar from "../../hooks/useSnackbar";

interface LoginPageProps {
  setPage: (page: number) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setPage }) => {
  //@ts-ignore
  const { auth, setAuth } = useAuth();
  //@ts-ignore
  const { setLogged } = useLogged();
  //@ts-ignore
  const { setSnackbarParams } = useSnackbar();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/users/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("ZALOGOWANO! ", response.data);

      const accessToken = response.data.accessToken;
      const roles = response.data.roles; //should be an array
      const firstname = response.data.firstname;
      const lastname = response.data.lastname;

      setAuth({ email, roles, accessToken, firstname, lastname });
      setLogged(true);
      setSnackbarParams({
        severity: "success",
        text: "Logged in successfully!",
      });
    } catch (err) {
      setSnackbarParams({
        severity: "error",
        text: "Invalid login credentials. Please try again or contact customer support.",
      });
      console.log(err);
    }
  };
  return (
    <div>
      <div
        className="loginForm"
        onSubmit={(e) => {
          handleLogin(e);
        }}
      >
        <form>
          <div className="loginElement">
            <label>Email:</label>
            <br />
            <input
              value={email}
              placeholder="john.smith@example.com"
              className="inputInLoginForm"
              type="text"
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
            />
          </div>
          <div className="loginElement">
            <label>Password</label>
            <br />
            <input
              value={password}
              placeholder="********"
              className="inputInLoginForm"
              type="password"
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
            />
          </div>
          <button className="flex bg-red-400 pl-3 pr-3 pt-1 pb-1 ml-auto mr-auto mt-3 mb-3 rounded text-white text-lg searchButton hover:bg-red-500">
            <span>Login</span>
            <span className="mt-1 ml-1">
              <HiLogin style={{ marginTop: "2px" }} />
            </span>
          </button>
        </form>
        <div className="flex justify-evenly">
          <button
            className="underline hover:text-green-500 hover:font-bold"
            onClick={() => setPage(1)}
          >
            Create account
          </button>
          <button
            className="underline hover:text-green-500 hover:font-bold"
            onClick={() => setPage(2)}
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
