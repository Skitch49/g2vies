import { Suspense } from "react";
import { Outlet } from "react-router-dom";

function Stripe() {
  return (
    <Suspense>
      <Outlet />
    </Suspense>
  );
}
export default Stripe;
