import { NavLink } from "react-router-dom";

function ProductList() {
  return (
    <div className="card">
      <h1>ProductList</h1>
      <NavLink to="add" className="btn btn-primary">
        Ajouter un produit
      </NavLink>
    </div>
  );
}
export default ProductList;
