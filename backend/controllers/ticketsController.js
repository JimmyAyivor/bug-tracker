const express = require("express");
const tickets = express.Router();
const {
  getAllTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket
} = require("../queries/tickets.js");

/**
 * @swagger
 * components:
 *    schemas:
 *     Ticket:
 *       type: object
 *   required:
 *         - id
 *         - title
 *         - created_at
 *         - deadline
 *         - description
 *         - priority
 *         - status 
 *     properties:
 *             id:
 *           type: integer
 *    description: The Auto-generated id of a ticket
 *          title:
 *           type: string
 *    description: title of ticket
 *         description:
 *           type: string
 *           description: a description of ticket
 *         priority_id:
 *           type: integer
 *           description: The Auto-generated id of a ticket
 *         user_id:
 *           type: integer
 *           description: The Auto-generated id of a ticket
 *         status_id: 
 *           type: integer
 *           description: The Auto-generated id of a ticket
 *         ticket_type_id: 
 *           type: integer
 *           description: The Auto-generated id of a ticket
 *         project_id: 
 *           type: integer
 *           description: The Auto-generated id of a ticket
 *         created_at:
 *            type: timestamp
 *            description: a timestamp of ticket
 *         deadline:
 *            type: timestamp
 *            description: a timestamp of ticket
 *       example:
 *             id: 3
 *             title: New Ticket 
 *             description: Some ticket description
 *             priority_id: 2
 *             user_id: 1
 *             status_id: 3
 *             ticket_type_id: 2
 *             project_id: 2
 *             created_at: 2022-09-12T22:39:22.433Z 
 *             updated_at: 2022-09-12T22:39:22.433Z 
 *
 */

/**
 * @swagger
 *  tags:
 *    name: tickets
 *    description: tickets of admins
 */


/**
 * @swagger
 * /tickets:
 *   get:
 *     summary: Returns all tickets
 *     tags: [tickets]
 *     responses:
 *       200:
 *         description: the list of tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ticket'
 */


tickets.get("/", async (req, res) => {
  const allTickets = await getAllTickets();
  if (allTickets[0]) {
    res.status(200).json(allTickets);
  } else {
    res.status(500).json({ error: "server error!" });
  }
});


/**
 * @swagger
 * /tickets/{ticketId}}:
 *   get:
 *     summary: Gets ticket by ID
 *     tags: [tickets]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: ID of ticket
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: tickets by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       400:
 *         description: ticket can not be found
 */




tickets.get("/:id", async (req, res) => {
  const { id } = req.params;
  const ticket = await getTicket(id);
  if (ticket.id) {
    
    res.status(200).json(ticket);
  } else {
    res.status(404).json({ error: "ticket not found" });
  }
});


/**
 * @swagger
 * /tickets:
 *   post:
 *     summary: Creates a new ticket
 *     tags: [tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ticket'
 *     responses:
 *       200:
 *         description: The post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       500:
 *         description: Some server error
 */


tickets.post("/", async (req, res) => {
    console.log(req.body);
    try {
        const createdTicket = await createTicket(req.body);
        res.status(201).json(createdTicket);
    } catch (err) {
        res.status(422).json({error: "unprocessable entity"});
    }
});


/**
 * @swagger
 * /tickets/{ticketId}}:
 *   put:
 *     summary: Updates ticket by ID
 *     tags: [tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ticket ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ticket'
 *     responses:
 *       200:
 *         description: The ticket was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       404:
 *         description: ticket was not found.
 *       500:
 *         description: Some errors happened.
 *
 */


tickets.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedTicket = await updateTicket(id, req.body);
  if (updatedTicket.id) {
    res.status(200).json(updatedTicket)
  } else {
    res.status(404).json({error: "no ticket found to - update failed!"})
  }
})


/**
 * @swagger
 *  /tickets/{ticketId}}:
 *    delete:
 *      summary: Deletes a ticket
 *      tags: [tickets]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ticket ID
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: The ticket was deleted
 *        404:
 *          description: The ticket was not found
 *
 */



tickets.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deletedTicket = await deleteTicket(id);
    if (deletedTicket.id) {
        res.status(200).json(deletedTicket)
    } else {
        res.status(404).json({error: "No ticket found at that ID - delete failed!!!"})
    }
});
module.exports = tickets;
