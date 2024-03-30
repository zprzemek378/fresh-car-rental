import { HiLogin } from "react-icons/hi";

interface ResetPasswordProps {
  setPage: (page: number) => void;
}

const ResertPasswordPage: React.FC<ResetPasswordProps> = ({ setPage }) => {
  const handleResetPassword = (e: any) => {
    e.preventDefault();
  };

  return (
    <div>
      <div
        className="loginForm"
        onSubmit={(e) => {
          handleResetPassword(e);
        }}
      >
        <form>
          <div className="loginElement">
            <label>Email:</label>
            <br />
            <input
              placeholder="john.smith@example.com"
              className="inputInLoginForm"
              type="text"
              onChange={(e) => {}}
            />
          </div>
          <button className="flex bg-red-400 pl-3 pr-3 pt-1 pb-1 ml-auto mr-auto mt-3 mb-3 rounded text-white text-lg searchButton hover:bg-red-500">
            <span>Reset password</span>
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

export default ResertPasswordPage;
