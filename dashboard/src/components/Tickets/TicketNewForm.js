import { useContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { ProjectContext } from "../../contexts/ProjectContext";
const API = process.env.REACT_APP_API_URL;
const now = new Date();
function TicketNewForm() {
  const [projects, setproject] = useContext(ProjectContext)
  const [ticket, setTicket] = useState({
    title: "", 
    description: "",
    priority_id:"1", 
    user_id:"1", 
    status_id:"1", 
    ticket_type_id:"1", 
    project_id:"2", 
    created_at:now,
  });

  
  const navigate = useHistory();
  const projectOptions = [
    "Project 1",
    "Project 2",
    "Project 3",
    "Project 4",
    "Project 5",
  ];

  const priorityOptions = ["Low", "Medium", "High", "Urgent"];
  const typeOptions = ["UI", "Maintenance", "New Development"];
  const statusOptions = [
    "New",
    "Unassigned",
    "Development",
    "Testing",
    "Resolved",
    "Archived",
  ];

  const addTicket = () => {
    axios
      .post(`${API}/tickets`, ticket)
      .then((response) => navigate.push(`/tickets`))
      .catch((error) => console.error(error));
  };
  const handleTextChange = (event) => {
    setTicket({ ...ticket, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTicket();
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate.push(`/tickets`);
  };

  return (
    <>
      <Row>
        <Col sm={12}>
          <Form onSubmit={handleSubmit}>
            <Card>
              <Card.Header>
                <Card.Title as='h5'>New Ticket</Card.Title>
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
                        value={ticket.title}
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
                        value={ticket.description}
                        size='50'
                        onChange={handleTextChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId='project_id'>
                      <Form.Label>Select Project</Form.Label>
                      <Form.Control as='select'onChange={handleTextChange}>
                        <option>Select...</option>{" "}
                        {projects.map(({id,name}) => {
                          return <option value={id} >{name}</option>;
                        })}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='ticket_priority'>
                      <Form.Label>Ticket Priority</Form.Label>
                      <Form.Control as='select'onChange={handleTextChange}>
                        <option>Select...</option>
                        {priorityOptions.map((t,i) => {
                          return <option value={i}  >{t}</option>;
                        })}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='ticket_type'>
                      <Form.Label>Ticket Type</Form.Label>
                      <Form.Control as='select' onChange={handleTextChange}>
                        <option>Select...</option>
                        {typeOptions.map((p,i) => {
                          return <option value={i} >{p}</option>;
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
    //       value={ticket.name}
    //       type='text'
    //       size='50'
    //       onChange={handleTextChange}
    //       placeholder='Name of ticket'
    //       required
    //     />
    //     <label htmlFor='image'>Image:</label>
    //     <input
    //       id='image'
    //       name='image'
    //       value={ticket.image}
    //       type='text'
    //       size='50'
    //       placeholder='http://'
    //       pattern='https://.*'
    //       onChange={handleTextChange}
    //     />
    //     <label htmlFor='fiber'>Fiber:</label>
    //     <input
    //       id='fiber'
    //       value={ticket.fiber}
    //       type='number'
    //       size='50'
    //       min='0'
    //       onChange={handleTextChange}
    //     />
    //     <label htmlFor='protein'>Protein:</label>
    //     <input
    //       id='protein'
    //       value={ticket.protein}
    //       type='number'
    //       size='50'
    //       min='0'
    //       onChange={handleTextChange}
    //     />
    //     <label htmlFor='added_sugar'>Added Sugar:</label>
    //     <input
    //       id='added_sugar'
    //       value={ticket.added_sugar}
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

export default TicketNewForm;
