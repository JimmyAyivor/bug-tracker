const express = require("express");
const users = express.Router();
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require("../queries/users.js");
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
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
 *    name: users
 *    description: Operations about user
 */


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns all users
 *     tags: [users]
 *     responses:
 *       200:
 *         description: the list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

users.get("/", async (req, res) => {
  const { userId } = req.params;
  const allUsers = await getAllUsers(userId);
  if (allUsers[0]) {
    res.status(200).json(allUsers);
  } else {
    res.status(500).json({ error: "server error!" });
  }
});


/**
 * @swagger
 * /users/{userId}}:
 *   get:
 *     summary: Gets user by ID
 *     tags: [users]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of user
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: users by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: user can not be found
 */

users.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await getUser(id);
  if (user.id) {
    
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Creates a new user
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */




users.post("/", async (req, res) => {
    try {
        const createdUser = await createUser(req.body);
        res.status(201).json(createdUser);
    } catch (err) {
        res.status(422).json({error: "unprocessable entity"});
    }
});

/**
 * @swagger
 * /users/{userId}}:
 *   put:
 *     summary: Updates user by ID
 *     tags: [users]
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
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: user was not found.
 *       500:
 *         description: Some errors happened.
 *
 */



users.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedUser = await updateUser(id, req.body);
  if (updatedUser.id) {
      res.status(200).json(updatedUser)
  } else {
      res.status(404).json({error: "no User found to - update failed!"})
  }
})

/**
 * @swagger
 *  /users/{userId}}:
 *    delete:
 *      summary: Deletes a user
 *      tags: [users]
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



users.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deletedUser = await deleteUser(id);
    if (deletedUser.id) {
        res.status(200).json(deletedUser)
    } else {
        res.status(404).json({error: "No User found at that ID - delete failed!!!"})
    }
});



module.exports = users;
