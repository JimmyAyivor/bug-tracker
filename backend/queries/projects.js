const db = require("../db/dbConfig.js");

const getAllProjects = async () => {
  try {
    const allProjects = await db.any(`SELECT p.id, p.title, p.created_at,p.deadline, description, priority, status  from projects p INNER join priority ON priority.id = p.priority_id 
    INNER join status ON status.id = p.status_id`);
    return allProjects;
  } catch (err) {
    return err;
  }
};

const getProject = async (id) => {
  try {
    const project = await db.one(`SELECT p.id, p.title, p.created_at,p.deadline, description, priority, status  from projects p INNER join priority ON priority.id = p.priority_id 
    INNER join status ON status.id = p.status_id WHERE p.id=$1`, id);
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
  const { title, description, deadline, priority_id, status_id} = project;

  try {
    const updatedProject = await db.one(
      "UPDATE projects SET title= $1, description= $2, deadline= $3, priority_id= $4, status_id= $5 WHERE id = $6 RETURNING *",
      [title, description, deadline, priority_id, status_id, id]
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
