import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../context";
import { useState } from "react";
import { login, logout } from "../../api";

function AuthProvider({ children }) {
  const initialUser = useLoaderData();
  const [user, setUser] = useState(initialUser);

  async function signin(credentials) {
    console.log(credentials);
    const newUser = await login(credentials);
    setUser(newUser);
  }
  async function signout() {
    await logout();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
