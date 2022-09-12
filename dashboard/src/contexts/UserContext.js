import { useEffect } from "react";
import { useState, createContext } from "react";
import axios from "axios"
const API = process.env.REACT_APP_API_URL;

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [users]);

  return (
    <UserContext.Provider value={[users, setUsers]}>
      {children}
    </UserContext.Provider>
  );
};
