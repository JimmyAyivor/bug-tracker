const db = require("../db/dbConfig.js");

const getAllTickets = async () => {
  try {
    const allTickets =
      await db.any(`SELECT t.id, t.title, t.created_at, t.description, priority, status, ticket_type,users.first_name,project_id, projects.title project  from tickets t join priority ON priority.id = t.priority_id 
     join status ON status.id = t.status_id
     join ticket_type ON ticket_type.id = t.ticket_type_id
     join users ON users.id = t.user_id
     join projects ON projects.id = t.project_id`);
    return allTickets;
  } catch (err) {
    return err;
  }
};

const getTicket = async (id) => {
  try {
    const ticket = await db.one(
      `SELECT t.id, t.title, t.created_at, t.description, priority, status, ticket_type,users.first_name,project_id, projects.title project  from tickets t join priority ON priority.id = t.priority_id 
    join status ON status.id = t.status_id
    join ticket_type ON ticket_type.id = t.ticket_type_id
    join users ON users.id = t.user_id
    join projects ON projects.id = t.project_id WHERE t.id=$1`,
      id
    );
    return ticket;
  } catch (err) {
    return err;
  }
};

const createTicket = async (ticket) => {
  const {
    title,
    description,
    priority_id,
    user_id,
    status_id,
    ticket_type_id,
    project_id,
    created_at,
  } = ticket;
  try {
    const createdTicket = await db.one(
      "INSERT INTO tickets ( title, description, priority_id, user_id, status_id, ticket_type_id, project_id, created_at ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        title,
        description,
        priority_id,
        user_id,
        status_id,
        ticket_type_id,
        project_id,
        created_at,
      ]
    );
    return createdTicket;
  } catch (err) {
    return err;
  }
};

const deleteTicket = async (id) => {
  try {
    const deletedTicket = await db.one(
      "DELETE FROM tickets WHERE id =$1 RETURNING *",
      id
    );
    return deletedTicket;
  } catch (err) {
    return err;
  }
};

const updateTicket = async (id, ticket) => {
  const {
    title,
    description,
    priority_id,
    user_id,
    status_id,
    ticket_type_id,
    project_id,
  } = ticket;

  try {
    const updatedTicket = await db.one(
      "UPDATE tickets SET  title=$1, description=$2, priority_id=$3, user_id=$4, status_id=$5, ticket_type_id=$6, project_id=$7 WHERE id=$8 RETURNING *",
      [
        title,
        description,
        priority_id,
        user_id,
        status_id,
        ticket_type_id,
        project_id,
        id,
      ]
    );
    return updatedTicket;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
};
