import { Outlet } from "react-router-dom";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import UserHeader from "./components/UserHeader";
interface Props {}

const App = (props: Props) => {

  const userFromDB = {
    name: "Juan Pérez"
  };

  return (
    <>
      <nav className="bg-white shadow px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center text-lg font-semibold text-gray-800">
            <FontAwesomeIcon icon={faHome} className="text-blue-500 mr-2" />
            <span>Regis</span><span className="ml-1 font-bold">Tec</span>
          </Link>
        </div>

        <div className="flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-500 font-medium">Home</Link>
          <Link to="/products" className="text-gray-700 hover:text-blue-500 font-medium">Products</Link>
          <Link to="/users" className="text-gray-700 hover:text-blue-500 font-medium">Users</Link>
          <Link to="/providers" className="text-gray-700 hover:text-blue-500 font-medium">Providers</Link>
          <UserHeader username={userFromDB.name} />
        </div>

        <div>
          <button
            type="button"
            className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-medium rounded px-4 py-2 transition"
          >
            Login
          </button>
        </div>
      </nav>

      <main className="p-6">
        <Outlet />
      </main>
    </>
  );
};

export default App;
