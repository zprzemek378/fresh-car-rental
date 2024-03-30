import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import UserElement from "./UserElement";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const fetchUsers = async () => {
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.get("users/allUsers", {
        signal: controller.signal,
      });

      console.log(response.data);
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="accountElement">
      {users.length > 0 ? (
        users.map((u) => <UserElement user={u} />)
      ) : (
        <div className="ml-auto mr-auto mt-5 text-center text-red-700 font-bold text-2xl">
          No users
        </div>
      )}
    </div>
  );
};

export default AllUsers;
