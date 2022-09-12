import { useEffect } from "react";
import { useState, createContext } from "react";
import axios from "axios"
const API = process.env.REACT_APP_API_URL;

export const TicketContext = createContext();
export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/tickets`)
      .then((response) => {
        setTickets(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [tickets]);

  return (
    <TicketContext.Provider value={[tickets, setTickets]}>
      {children}
    </TicketContext.Provider>
  );
};
