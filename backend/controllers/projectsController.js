const express = require("express");
const projects = express.Router({ mergeParams: true });
const {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require("../queries/projects.js");

projects.get("/", async (req, res) => {
  const { projectId } = req.params;
  const allProjects = await getAllProjects(projectId);
  if (allProjects[0]) {
    res.status(200).json(allProjects);
  } else {
    res.status(500).json({ error: "server error!" });
  }
});

projects.get("/:id", async (req, res) => {
  const { id } = req.params;
  const project = await getProject(id);
  if (project.id) {
    res.status(200).json(project);
  } else {
    res.status(404).json({ error: "Project not found" });
  }
});

projects.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const createdProject = await createProject(req.body);
    res.status(201).json(createdProject);
  } catch (err) {
    res.status(422).json({ error: "unprocessable entity" });
  }
});

projects.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedProject = await deleteProject(id);
  if (deletedProject.id) {
    res.status(200).json(deletedProject);
  } else {
    res
      .status(404)
      .json({ error: "No Project found at that ID - Delete failed!!!" });
  }
});

projects.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedProject = await updateProject(id, req.body);
  if (updatedProject.id) {
    res.status(200).json(updatedProject);
  } else {
    res.status(404).json({ error: "No Project found at that ID - Update failed!" });
  }
});

module.exports = projects;
