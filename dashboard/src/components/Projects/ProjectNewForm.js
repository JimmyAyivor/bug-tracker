import { useState, useNavigate} from "react";
import axios from "axios";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

const API = process.env.REACT_APP_API_URL;
function ProjectNewForm() {
  const navigate = useNavigate()
  const now = new Date();

  const [project, setProject] = useState({
    title: "",
    description: "",
    priority_id: "1",
    user_id: "1",
    status_id: "1",
    created_at: now,
    deadline: now,
  });


  const priorityOptions = ["Low", "Medium", "High", "Urgent"];
  const typeOptions = ["UI", "Maintenance", "New Development"];
  // const statusOptions = [
  //   "New",
  //   "Unassigned",
  //   "Development",
  //   "Testing",
  //   "Resolved",
  //   "Archived",
  // ];

  const addProject = () => {
    axios
      .post(`${API}/projects`, project)
      .then((response) => navigate(`/projects`))
      .catch((error) => console.error(error));
  };
  const handleTextChange = (event) => {
    setProject({ ...project, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addProject();

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
                <Card.Title as='h5'>New project</Card.Title>
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
                      <Form.Label>Project Priority</Form.Label>
                      <Form.Control as='select' onChange={handleTextChange}>
                        <option>Select...</option>
                        {priorityOptions.map((t, i) => {
                          return <option value={i}>{t}</option>;
                        })}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='project_type'>
                      <Form.Label>Project Type</Form.Label>
                      <Form.Control as='select' onChange={handleTextChange}>
                        <option>Select...</option>
                        {typeOptions.map((p, i) => {
                          return <option value={i}>{p}</option>;
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
    // <div className='New'>
    //   <form onSubmit={handleSubmit}>
    //     <label htmlFor='name'>Name:</label>
    //     <input
    //       id='name'
    //       value={project.name}
    //       type='text'
    //       size='50'
    //       onChange={handleTextChange}
    //       placeholder='Name of project'
    //       required
    //     />
    //     <label htmlFor='image'>Image:</label>
    //     <input
    //       id='image'
    //       name='image'
    //       value={project.image}
    //       type='text'
    //       size='50'
    //       placeholder='http://'
    //       pattern='https://.*'
    //       onChange={handleTextChange}
    //     />
    //     <label htmlFor='fiber'>Fiber:</label>
    //     <input
    //       id='fiber'
    //       value={project.fiber}
    //       type='number'
    //       size='50'
    //       min='0'
    //       onChange={handleTextChange}
    //     />
    //     <label htmlFor='protein'>Protein:</label>
    //     <input
    //       id='protein'
    //       value={project.protein}
    //       type='number'
    //       size='50'
    //       min='0'
    //       onChange={handleTextChange}
    //     />
    //     <label htmlFor='added_sugar'>Added Sugar:</label>
    //     <input
    //       id='added_sugar'
    //       value={project.added_sugar}
    //       type='number'
    //       size='50'
    //       min='0'
    //       onChange={handleTextChange}
    //     />

    //     <br />
    //     <input type='submit' />
    //   </form>
    // </div>
  );
}

export default ProjectNewForm;
