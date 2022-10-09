import React from "react";
import { TicketContext } from "../../contexts/TicketContext";
import { useContext } from "react";
import Tickets from "../../components/Tickets/Tickets";

const TicketIndex = () => {
  const tickects = useContext(TicketContext)
  const allTickects = [...tickects[0]]
  
  return (<>
      <Tickets data={allTickects} />
      </>
  );
};

export default TicketIndex;
