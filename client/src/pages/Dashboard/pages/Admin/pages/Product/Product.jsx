import { Outlet } from "react-router-dom";

function Product() {
  return (
    <div>
      <h1>Product</h1>
      <Outlet />
    </div>
  );
}
export default Product;
