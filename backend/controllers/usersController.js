const express = require("express");
const users = express.Router();
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require("../queries/users.js");

users.get("/", async (req, res) => {
  const { userId } = req.params;
  const allUsers = await getAllUsers(userId);
  if (allUsers[0]) {
    res.status(200).json(allUsers);
  } else {
    res.status(500).json({ error: "server error!" });
  }
});

users.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await getUser(id);
  if (user.id) {
    
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

users.post("/", async (req, res) => {
    try {
        const createdUser = await createUser(req.body);
        res.status(201).json(createdUser);
    } catch (err) {
        res.status(422).json({error: "unprocessable entity"});
    }
});

users.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deletedUser = await deleteUser(id);
    if (deletedUser.id) {
        res.status(200).json(deletedUser)
    } else {
        res.status(404).json({error: "No User found at that ID - delete failed!!!"})
    }
});

users.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updatedUser = await updateUser(id, req.body);
    if (updatedUser.id) {
        res.status(200).json(updatedUser)
    } else {
        res.status(404).json({error: "no User found to - update failed!"})
    }
})

module.exports = users;
