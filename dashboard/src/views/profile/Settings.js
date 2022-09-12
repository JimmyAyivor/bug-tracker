import React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FormsElements = () => {

  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Profile Settings</Card.Title>
              <Form.Text className="text-muted">Change your basic account settings here. You may also want to <Link to="/profile/edit">edit your profile</Link>.</Form.Text>

            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="email" placeholder="Name" />
                      <Form.Text className="text-muted">Please enter your full name.</Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Username</Form.Label>
                      <Form.Control type="email" placeholder="Username" />
                      <Form.Text className="text-muted">Enter your prefered username.</Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" />
                      <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" />
                    <Form.Text className="text-muted">LEAVE BLANK if you do not wish to change YOUR PASSWORD.</Form.Text>
                    </Form.Group>
                    <Button variant="primary">Submit</Button>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      
       
       
        
       
        
       
      </Row>
    </React.Fragment>
  );
};

export default FormsElements;
