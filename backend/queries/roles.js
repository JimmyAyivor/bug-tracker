const db = require("../db/dbConfig.js");

const getAllRoles = async () => {
  try {
    const allRoles = await db.any("SELECT * FROM roles");
    return allRoles;
  } catch (err) {
    return err;
  }
};

const getRole = async (id) => {
  try {
    const role = await db.one("SELECT * FROM roles WHERE id=$1", id);
    return role;
  } catch (err) {
    return err;
  }
};

const createRole = async (roles) => {
  const { role,created_at} = roles;

  try {
    const createdRole = await db.one(
      "INSERT INTO roles (role,created_at) VALUES ($1,$2) RETURNING *",
      [role,created_at]
    );
    return createdRole;
  } catch (err) {
    return err;
  }
};


const deleteRole = async (id) => {
  try {
    const deletedRole = await db.one(
      "DELETE FROM roles WHERE id =$1 RETURNING *",
      id
    );
    return deletedRole;
  } catch (err) {
    return err;
  }
};

const updateRole = async (id, roles) => {
  const {  role } = roles;

  try {
    const updatedRole = await db.one(
      "UPDATE roles SET role = $1 WHERE id = $2 RETURNING *",
      [ role, id ]
    );
    return updatedRole;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
};
