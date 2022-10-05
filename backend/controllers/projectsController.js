const express = require("express");
const projects = express.Router({ mergeParams: true });
const {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require("../queries/projects.js");

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - created_at
 *         - deadline
 *         - description
 *         - priority
 *         - status 
 *       properties:
 *         id:
 *           type: integer
 *           description: The Auto-generated id of a project
 *         title:
 *           type: string
 *           description: title of project
 *         created_at:
 *            type: timestamp
 *            description: a timestamp of project
 *         deadline:
 *            type: timestamp
 *            description: a timestamp of project
 *         description:
 *           type: string
 *           description: a description of project
 *         priority:
 *           type: integer
 *           description: A string representation of a project priority
 *         status: 
 *           type: string
 *           description: A string representation of a project status
 *       example:
 *          id: 2
 *          title: Project 1
 *          created_at: 2022-09-07T13:42:17.535Z
 *          deadline: 2022-08-09T04:00:00.000Z
 *          description: Description for project 1
 *          priority: LOW
 *          status: NEW
 *
 */

/**
 * @swagger
 *  tags:
 *    name: projects
 *    description: Projects of admins
 */


/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Returns all projects
 *     tags: [projects]
 *     responses:
 *       200:
 *         description: the list of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 */

projects.get("/", async (req, res) => {
  const { projectId } = req.params;
  const allProjects = await getAllProjects(projectId);
  if (allProjects[0]) {
    res.status(200).json(allProjects);
  } else {
    res.status(500).json({ error: "server error!" });
  }
});



/**
 * @swagger
 * /projects/{projectId}}:
 *   get:
 *     summary: Gets project by ID
 *     tags: [projects]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: ID of project
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: projects by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       400:
 *         description: project can not be found
 */


projects.get("/:id", async (req, res) => {
  const { id } = req.params;
  const project = await getProject(id);
  if (project.id) {
    res.status(200).json(project);
  } else {
    res.status(404).json({ error: "Project not found" });
  }
});

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Creates a new project
 *     tags: [projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: The post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       500:
 *         description: Some server error
 */



projects.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const createdProject = await createProject(req.body);
    res.status(201).json(createdProject);
  } catch (err) {
    res.status(422).json({ error: "unprocessable entity" });
  }
});


/**
 * @swagger
 * /projects/{projectId}}:
 *   put:
 *     summary: Updates project by ID
 *     tags: [projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: The project was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: project was not found.
 *       500:
 *         description: Some errors happened.
 *
 */

projects.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedProject = await updateProject(id, req.body);
  if (updatedProject.id) {
    res.status(200).json(updatedProject);
  } else {
    res
      .status(404)
      .json({ error: "No Project found at that ID - Update failed!" });
  }
});


/**
 * @swagger
 *  /projects/{projectId}}:
 *    delete:
 *      summary: Deletes a project
 *      tags: [projects]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: project ID
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: The project was deleted
 *        404:
 *          description: The project was not found
 *
 */

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


module.exports = projects;
