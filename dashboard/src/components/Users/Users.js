import { useEffect, useState } from "react";
import Ticket from "./User";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

const Tickets = () => {
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
  }, []);

  return (
    <>
      {tickets.map((ticket) => {
        return <Ticket key={ticket.id} id ={ticket.id} ticket={ticket} />;
      })}
    </>
  );
};

export default Tickets;
