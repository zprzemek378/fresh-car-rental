import axios from "../../api/axios";
import { useState } from "react";
import { HiLogin } from "react-icons/hi";
import useSnackbar from "../../hooks/useSnackbar";

//george - pies12345
//cory - cory123
//walter - walter123
//jessica - jess123
//ray - ray123

interface RegisterPageProps {
  setPage: (page: number) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ setPage }) => {
  //TODO
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //@ts-ignore
  const { setSnackbarParams } = useSnackbar();

  const postNewUser = async () => {
    try {
      const response = await axios.post(
        "/users/register",
        JSON.stringify({
          email: email,
          password: password,
          firstname: firstName,
          lastname: lastName,
          roles: {
            Client: 2001,
          },
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setSnackbarParams({
        severity: "success",
        text: "Account created successfully! You can now log in.",
      });
    } catch (err) {
      console.log(err);
      setSnackbarParams({
        severity: "error",
        text: "An account with the provided email address already exists",
      });
    }
  };

  const handleRegister = (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setSnackbarParams({
        severity: "error",
        text: "Passwords are not the same!",
      });
      return;
    }

    postNewUser();
  };

  return (
    <div>
      <div
        className="loginForm"
        onSubmit={(e) => {
          handleRegister(e);
        }}
      >
        <form>
          <div className="flex justify-evenly">
            <div className="nameElement bg-green-500">
              <label>First name:</label>
              <br />
              <input
                value={firstName}
                placeholder="John"
                className="nameInRegisterForm"
                type="text"
                onChange={(e) => {
                  setFirstName(e.currentTarget.value);
                }}
              />
            </div>
            <div className="nameElement">
              <label>Last name:</label>
              <br />
              <input
                value={lastName}
                placeholder="Smith"
                className="nameInRegisterForm"
                type="text"
                onChange={(e) => {
                  setLastName(e.currentTarget.value);
                }}
              />
            </div>
          </div>

          <div className="loginElement">
            <label>Email</label>
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
            <label>Set password</label>
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

          <div className="loginElement">
            <label>Confirm password</label>
            <br />
            <input
              value={confirmPassword}
              placeholder="********"
              className="inputInLoginForm"
              type="password"
              onChange={(e) => {
                setConfirmPassword(e.currentTarget.value);
              }}
            />
          </div>

          <button className="flex bg-red-400 pl-3 pr-3 pt-1 pb-1 ml-auto mr-auto mt-3 mb-3 rounded text-white text-lg searchButton hover:bg-red-500">
            <span>Register</span>
            <span className="mt-1 ml-1">
              <HiLogin style={{ marginTop: "2px" }} />
            </span>
          </button>
        </form>
        <div className="flex justify-evenly">
          <button
            className="underline hover:text-green-500 hover:font-bold"
            onClick={() => setPage(0)}
          >
            Back to login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
