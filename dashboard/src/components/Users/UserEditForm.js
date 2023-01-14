import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Card, Form, Button } from "react-bootstrap";

import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function UserEditForm() {
  let { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    title: "",
    description: "",
    priority_id: "",
    status_id: "",
    user_id: "",
    created_at: "",
    deadline: "",
    user_type_id: "",
  });

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

  const handleTextChange = (event) => {
    setUser({ ...user, [event.target.id]: event.target.value });
  };

  useEffect(() => {
    axios
      .get(`${API}/users/${id}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  const updateUser = () => {
    axios
      .put(`${API}/users/${id}`, user)
      .then((response) => {
        setUser(response.data);
        navigate.push(`/users`);
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser();
  };
  const handleCancel = (event) => {
    event.preventDefault();
    navigate(`/users`);
  };
  return (
    <>
      <Row>
        <Col sm={12}>
          <Form onSubmit={handleSubmit}>
            <Card>
              <Card.Header>
                <Card.Title as='h5'>Edit User</Card.Title>
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
                        value={user.title}
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
                        value={user.description}
                        size='50'
                        onChange={handleTextChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId='user_priority'>
                      <Form.Label>user Priority</Form.Label>
                      <Form.Control
                        as='select'
                        value={user.priority_id}
                        onChange={handleTextChange}
                      >
                        {priorityOptions && priorityOptions.map((t, i) => {
                          return <option value={i}>{t}</option>;
                        })}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='user_type'>
                      <Form.Label>user Type</Form.Label>
                      <Form.Control
                        as='select'
                        value={user.user_type_id}
                        onChange={handleTextChange}
                      >
                        {typeOptions && typeOptions.map((p, i) => {
                          return <option value={i}>{p}</option>;
                        })}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='user_status'>
                      <Form.Label>user Status</Form.Label>
                      <Form.Control
                        as='select'
                        value={user.status_id}
                        onChange={handleTextChange}
                      >
                        {statusOptions && statusOptions.map((s, i) => {
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

export default UserEditForm;
