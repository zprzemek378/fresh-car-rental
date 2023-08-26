import { Link } from "react-router-dom";

interface NavbarLinkProps {
  name: string;
  minWidth: boolean;
}

const NavbarLink: React.FC<NavbarLinkProps> = ({ name, minWidth }) => {
  return (
    <Link
      to={`/${name.toLowerCase()}`}
      className="navbar-item rounded-lg hover:bg-gray-200"
    >
      <div
        className={`flex-1 p-2 ${
          !minWidth &&
          "border-t-2 border-gray-200 hover:bg-gray-200 hover:rounded-lg"
        }`}
      >
        {name}
      </div>
    </Link>
  );
};

export default NavbarLink;
