import "./App.css";
import ProductList from "./components/product/productList";
import SupplierList from "./components/supplier/supplierList";
import UserHeader from "./components/UserHeader";

const App = () => {
  const userFromDB = {
    name: "Juan Pérez",
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0">
        <UserHeader username={userFromDB.name} />
      </div>
      <div className="grid">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <ProductList />
        <h1 className="text-2xl font-bold">Supplier Management</h1>
        <SupplierList />
      </div>
    </>
  );
};

export default App;
