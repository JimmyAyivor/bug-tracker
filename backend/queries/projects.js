const db = require("../db/dbConfig.js");

const getAllProjects = async () => {
  try {
    const allProjects = await db.any(`SELECT t.id, t.title, t.created_at,t.deadline, description, priority, status  from projects t INNER join priority ON priority.id = t.priority_id 
    INNER join status ON status.id = t.status_id`);
    return allProjects;
  } catch (err) {
    return err;
  }
};

const getProject = async (id) => {
  try {
    const project = await db.one("SELECT * FROM projects WHERE id=$1", id);
    return project;
  } catch (err) {
    return err;
  }
};

const createProject = async (project) => {
  const { title, description, deadline, priority_id, status_id, created_at } = project;
  try {
    const createdProject = await db.one(
      "INSERT INTO projects ( title, description, deadline, priority_id, status_id, created_at ) VALUES ($1, $2, $3,$4, $5, $6) RETURNING *",
      [title, description, deadline, priority_id, status_id, created_at]
    );
    return createdProject;
  } catch (err) {
    return err;
  }
};

const deleteProject = async (id) => {
  try {
    const deletedProject = await db.one(
      "DELETE FROM projects WHERE id =$1 RETURNING *",
      id
    );
    return deletedProject;
  } catch (err) {
    return err;
  }
};

const updateProject = async (id, project) => {
  const { name, description, modified_on } = project;

  try {
    const updatedProject = await db.one(
      "UPDATE projects SET name = $1, description = $2, modified_on = $3 WHERE id = $4 RETURNING *",
      [name, description, modified_on, id]
    );
    return updatedProject;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
