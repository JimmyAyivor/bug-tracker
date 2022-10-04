import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Row, Col, Card, Form, Button } from "react-bootstrap";

import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function ProjectEditForm() {
  let { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState({
    title: "",
    description: "",
    priority_id: "",
    status_id: "",
    created_at: "",
    deadline: "",
  });
  const [endDate, setStartDate] = useState(new Date());

  const priorityOptions = ["1", "2", "3", "4"];
  const typeOptions = ["UI", "Maintenance", "New Development"];
  const statusOptions = ["1", "2", "3", "4", "5", "6"];

  const handleTextChange = (event) => {
    setProject({ ...project, [event.target.id]: event.target.value });
  };
  console.log(project);
  useEffect(() => {
    axios
      .get(`${API}/projects/${id}`)
      .then((response) => setProject(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  const updateProject = () => {
    axios
      .put(`${API}/projects/${id}`, project)
      .then((response) => {
        setProject(response.data);
        navigate(`/projects`);
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProject();
  };
  const handleCancel = (event) => {
    event.preventDefault();
    navigate(`/projects`);
  };
  return (
    <>
      <Row>
        <Col sm={12}>
          <Form onSubmit={handleSubmit}>
            <Card>
              <Card.Header>
                <Card.Title as='h5'>Edit projects</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Title'
                        id='title'
                        value={project.title}
                        size='50'
                        onChange={handleTextChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as='textarea'
                        rows='3'
                        id='description'
                        value={project.description}
                        size='50'
                        onChange={handleTextChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId='project_priority'>
                      <Form.Label>Priority</Form.Label>
                      <Form.Control
                        as='select'
                        value={project.priority}
                        onChange={handleTextChange}
                      >
                        {priorityOptions.map((t) => {
                          return <option value={t}>{project.priority}</option>;
                        })}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='project_type'>
                      <Form.Label>Deadline</Form.Label>
                      <Form.Control as='date'>
                        <DatePicker
                          selected={endDate}
                          onChange={(date) => setStartDate(date)}
                        />
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='project_status'>
                      <Form.Label>Status</Form.Label>
                      <Form.Control
                        as='select'
                        value={project.status}
                        onChange={handleTextChange}
                      >
                        {statusOptions.map((s) => {
                          return <option value={s}>{project.status}</option>;
                        })}
                      </Form.Control>
                    </Form.Group>

                    <Button variant='primary' type='submit'>
                      Submit
                    </Button>
                    <Button variant='light' onClick={handleCancel}>
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default ProjectEditForm;
