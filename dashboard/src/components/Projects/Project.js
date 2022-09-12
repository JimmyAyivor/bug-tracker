import React from "react";
import { Link } from "react-router-dom";
const Ticket = ({ ticket }) => {
  const { name, title,description,priority,created_by_user_id,closed_by_user_id,created_on,closed_on,ticket_type, id } = ticket;

 
  return (
    <article>
      <div className='Snack'>
        <Link to={`/tickets/${id}`}>
          <p>id: {id}</p>
          <p>"title": {title}</p>
          <p>"description": {description}</p>
          <p>"priority": {priority}</p>
          <p>"created by user id": {created_by_user_id}</p>
          <p>"closed by user id": {closed_by_user_id}</p>
          <p>"created on": {created_on}</p>
          <p>"closed on": {closed_on}</p>
          <p>"ticket type":{ticket_type}</p>
        </Link>
      </div>
    </article>
  );
};

export default Ticket;
