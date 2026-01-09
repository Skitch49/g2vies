import { Suspense } from "react";
import { Outlet } from "react-router-dom";

function Product() {
  return (
    <div>
      <h1>Product</h1>
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  );
}
export default Product;
