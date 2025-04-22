import "./App.css";
import ProductList from "./components/productList";
import UserHeader from "./components/UserHeader";

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
      </div>
    </>
  );
};

export default App;
