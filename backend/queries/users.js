const db = require("../db/dbConfig.js");

const getAllUsers = async () => {
  try {
    const allUsers = await db.any("SELECT * FROM users");
    return allUsers;
  } catch (err) {
    return err;
  }
};

const getUser = async (id) => {
  try {
    const user = await db.one("SELECT * FROM users WHERE id=$1", id);
    return user;
  } catch (err) {
    return err;
  }
};

const createUser = async (user) => {
  const { first_name, last_name, avatar, email, password, address, mobile, allow_notification, created_at, role, action } = user;

  try {
    const createdUser = await db.one(
      "INSERT INTO users ( first_name, last_name, avatar, email, password, address, mobile, allow_notification, created_at, role, action) VALUES ($1, $2, $3, $4, $5, $6,$7, $8, $9, $10, $11) RETURNING *",
      [first_name, last_name, avatar, email, password, address, mobile, allow_notification, created_at, role, action]
    );
    return createdUser;
  } catch (err) {
    return err;
  }
};


const deleteUser = async (id) => {
  try {
    const deletedUser = await db.one(
      "DELETE FROM users WHERE id =$1 RETURNING *",
      id
    );
    return deletedUser;
  } catch (err) {
    return err;
  }
};

const updateUser = async (id, user) => {
  const { first_name, last_name, avatar, email, password, address, mobile, allow_notification, created_at, role, action } = user;

  try {
    const updatedUser = await db.one(
      "UPDATE users SET name = $1, email = $2, password = $3, address = $4, allow_notification = $5, mobile = $6 WHERE id = $7 RETURNING *",
      [  first_name, last_name, avatar, email, password, address, mobile, allow_notification, created_at, role, action, id ]
    );
    return updatedUser;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
