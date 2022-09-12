const express = require("express");
const tickets = express.Router();
const {
  getAllTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket
} = require("../queries/tickets.js");

tickets.get("/", async (req, res) => {
  const allTickets = await getAllTickets();
  if (allTickets[0]) {
    res.status(200).json(allTickets);
  } else {
    res.status(500).json({ error: "server error!" });
  }
});

tickets.get("/:id", async (req, res) => {
  const { id } = req.params;
  const ticket = await getTicket(id);
  if (ticket.id) {
    
    res.status(200).json(ticket);
  } else {
    res.status(404).json({ error: "ticket not found" });
  }
});

tickets.post("/", async (req, res) => {
    console.log(req.body);
    try {
        const createdTicket = await createTicket(req.body);
        res.status(201).json(createdTicket);
    } catch (err) {
        res.status(422).json({error: "unprocessable entity"});
    }
});

tickets.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deletedTicket = await deleteTicket(id);
    if (deletedTicket.id) {
        res.status(200).json(deletedTicket)
    } else {
        res.status(404).json({error: "No ticket found at that ID - delete failed!!!"})
    }
});

tickets.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updatedTicket = await updateTicket(id, req.body);
    if (updatedTicket.id) {
        res.status(200).json(updatedTicket)
    } else {
        res.status(404).json({error: "no ticket found to - update failed!"})
    }
})

module.exports = tickets;
