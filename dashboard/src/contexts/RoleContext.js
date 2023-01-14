import { useEffect } from "react";
import { useState, createContext } from "react";
import axios from "axios"
const API = process.env.REACT_APP_API_URL;

export const RoleContext = createContext();
export const RoleProvider = ({ children }) => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/roles`)
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [roles]);

  return (
    <RoleContext.Provider value={[roles, setRoles]}>
      {children}
    </RoleContext.Provider>
  );
};
