import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col, Card, Form, Button } from "react-bootstrap";

import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function TicketEditForm() {
  let { id } = useParams();
  const navigate = useHistory();

  const [ticket, setTicket] = useState({
    title: "",
    description: "",
    priority_id: "",
    status_id: "",
    user_id: "",
    created_at: "",
    deadline: "",
    ticket_type_id: "",
  });

  const priorityOptions = [ "Low", "Medium", "High","Urgent"];
  const typeOptions = ["UI", "Maintenance", "New Development"];
  const statusOptions = [
    "New",
    "Unassigned",
    "Development",
    "Testing",
    "Resolved",
    "Archived",
  ];

  const handleTextChange = (event) => {
    setTicket({ ...ticket, [event.target.id]: event.target.value });
  };

  useEffect(() => {
    axios
      .get(`${API}/tickets/${id}`)
      .then((response) => setTicket(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  const updateTicket = () => {
    axios
      .put(`${API}/tickets/${id}`, ticket)
      .then((response) => {
        setTicket(response.data);
        navigate.push(`/tickets`);
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateTicket();
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
                <Card.Title as='h5'>Edit Tickets</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group >
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
                    <Form.Group >
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
                    <Form.Group controlId='ticket_priority'>
                      <Form.Label>Ticket Priority</Form.Label>
                      <Form.Control as='select' value={ticket.priority_id} onChange={handleTextChange}>
                        {priorityOptions.map((t,i) => {
                          return <option value={i} >{t}</option>;
                        })}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='ticket_type'>
                      <Form.Label>Ticket Type</Form.Label>
                      <Form.Control as='select' value={ticket.ticket_type_id} onChange={handleTextChange}>
                        {typeOptions.map((p,i) => {
                          return <option value={i} >{p}</option>;
                        })}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='ticket_status'>
                      <Form.Label>Ticket Status</Form.Label>
                      <Form.Control as='select' value={ticket.status_id} onChange={handleTextChange}>
                        {statusOptions.map((s,i) => {
                          return <option value={i}>{s}</option>;
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

export default TicketEditForm;
