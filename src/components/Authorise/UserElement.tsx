import { useState } from "react";

interface IUserElement {
  user: {
    firstname: string;
    lastname: string;
    email: string;
    roles: number[];
  };
}

const UserElement: React.FC<IUserElement> = ({ user }) => {
  const [pointingOnComponent, setPointingOnComponent] =
    useState<boolean>(false);
  return (
    <div
      className={`orderComponent userComponent ${
        pointingOnComponent && "orderComponent-onpoint"
      }`}
      onPointerLeave={() => setPointingOnComponent(false)}
      onPointerOver={() => setPointingOnComponent(true)}
    >
      <div className="groupUsers">
        <span className="flex-1 m-1">
          Email: <span className="font-bold">{user.email}</span>
        </span>
        <span className="flex-1 m-1">
          First Name: <span className="font-bold">{user.firstname}</span>
        </span>
      </div>{" "}
      <div className="groupUsers">
        <span className="flex-1 m-1">
          Last Name: <span className="font-bold">{user.lastname}</span>
        </span>
        <span className="flex-1 m-1">
          Permissions:{" "}
          <span className="font-bold">
            {user.roles.includes(5150) ? "Admin" : "User"}
          </span>
        </span>
      </div>
    </div>
  );
};

export default UserElement;
