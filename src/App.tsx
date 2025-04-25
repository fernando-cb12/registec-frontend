import "./App.css";
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

      <div className="grid">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <ProductList />
        <h1 className="text-2xl font-bold">Supplier Management</h1>
        <SupplierList />
        <h1 className="text-2xl font-bold">Graphs</h1>
        <ProductCategoryGraphs />
      </div>
    </>
  );
};

export default App;
