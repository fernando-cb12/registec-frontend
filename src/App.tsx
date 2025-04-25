import "./App.css";
import { Routes, Route, NavLink } from "react-router-dom";
import ProductList from "./components/product/productList";
import SupplierList from "./components/supplier/supplierList";
import UserHeader from "./components/UserHeader";
import ProductCategoryGraphs from "./components/product/graphs";

const App = () => {
  const userFromDB = {
    name: "Juan Pérez",
  };

  return (
    <>
      <UserHeader username={userFromDB.name} />

      <nav className="bg-gray-100 p-4">
        <ul className="flex space-x-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "hover:text-blue-400"
              }
            >
              Graphs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "hover:text-blue-400"
              }
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/suppliers"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "hover:text-blue-400"
              }
            >
              Suppliers
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="p-4">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1 className="text-2xl font-bold">Graphs</h1>
                <ProductCategoryGraphs />
              </>
            }
          />
          <Route
            path="/products"
            element={
              <>
                <h1 className="text-2xl font-bold">Product Management</h1>
                <ProductList />
              </>
            }
          />
          <Route
            path="/suppliers"
            element={
              <>
                <h1 className="text-2xl font-bold">Supplier Management</h1>
                <SupplierList />
              </>
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
