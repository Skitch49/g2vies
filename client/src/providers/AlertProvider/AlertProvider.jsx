import { createRef, useState } from "react";
import { AlertContext } from "../../context";

export function AlertProvider({ children }) {
  const [alerts, setAlerts] = useState([]);
  // valeur dans alert = state & value
  // valeur dans state = success info warning danger
  function addAlert(alert) {
    setAlerts((prev) => [
      { id: prev.length + 1, ref: createRef(null), ...alert },
      ...prev,
    ]);
  }

  function removeAlert(id) {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
}
