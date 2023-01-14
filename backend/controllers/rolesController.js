const express = require("express");
const roles = express.Router();
const {
  getAllRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole
} = require("../queries/roles.js");
/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - created_at
 *         - modified_at
 *         - description
 *         - role
 *         - status 
 *       properties:
 *         id:
 *           type: integer
 *           description: The Auto-generated id of a user
 *         title:
 *           type: string
 *           description: title of user
 *         created_at:
 *            type: timestamp
 *            description: a timestamp of user
 *         modified_at:
 *            type: timestamp
 *            description: the timestamp a user was last modified
 *         description:
 *           type: string
 *           description: a description of user
 *         role:
 *           type: integer
 *           description: The role of a user
 *         status: 
 *           type: integer
 *           description: The status a user
 *       example:
 *          id: 2
 *          title: user 1
 *          created_at: 2022-09-07T13:42:17.535Z
 *          deadline: 2022-08-09T04:00:00.000Z
 *          description: Description for user1
 *          role: manager 
 *          status: active
 *
 */

/**
 * @swagger
 *  tags:
 *    name: roles
 *    description: Operations about user
 */


/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Returns all roles
 *     tags: [roles]
 *     responses:
 *       200:
 *         description: the list of roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 */

roles.get("/", async (req, res) => {
  const allRoles = await getAllRoles();
  if (allRoles[0]) {
    res.status(200).json(allRoles);
  } else {
    res.status(500).json({ error: "server error!" });
  }
});


/**
 * @swagger
 * /roles/{userId}}:
 *   get:
 *     summary: Gets user by ID
 *     tags: [roles]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of user
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: roles by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         description: user can not be found
 */

roles.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await getRole(id);
  if (user.id) {
    
    res.json(user);
  } else {
    res.status(404).json({ error: "Role not found" });
  }
});

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Creates a new user
 *     tags: [roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       200:
 *         description: The post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       500:
 *         description: Some server error
 */




roles.post("/", async (req, res) => {
    try {
        const createdRole = await createRole(req.body);
        res.status(201).json(createdRole);
    } catch (err) {
        res.status(422).json({error: "unprocessable entity"});
    }
});

/**
 * @swagger
 * /roles/{userId}}:
 *   put:
 *     summary: Updates user by ID
 *     tags: [roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       200:
 *         description: The user was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: user was not found.
 *       500:
 *         description: Some errors happened.
 *
 */



roles.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedRole = await updateRole(id, req.body);
  if (updatedRole.id) {
      res.status(200).json(updatedRole)
  } else {
      res.status(404).json({error: "no Role found to - update failed!"})
  }
})

/**
 * @swagger
 *  /roles/{userId}}:
 *    delete:
 *      summary: Deletes a user
 *      tags: [roles]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: user ID
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: The user was deleted
 *        404:
 *          description: The user was not found
 *
 */



roles.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deletedRole = await deleteRole(id);
    if (deletedRole.id) {
        res.status(200).json(deletedRole)
    } else {
        res.status(404).json({error: "No Role found at that ID - delete failed!!!"})
    }
});



module.exports = roles;
