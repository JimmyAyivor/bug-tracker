import React from "react";
import { UserContext } from "../../../contexts/UserContext";
import { useContext } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { avatarFormatter, dateFormatter } from "../../../utils/helpers";
import {  useNavigate } from "react-router-dom";
const ManageRoles = () => {
  const [users] = useContext(UserContext);

  const members = [...users];
const navigate = useNavigate()
  const columns = [
    {
      text: "#",
      dataField: "id",
    },
    {
      text: "Name",
      dataField: "avatar",
      formatter: avatarFormatter,
    },
    {
      text: "Date Created",
      dataField: "created_at",
      formatter: dateFormatter,
    },
    {
      text: "Role ",
      dataField: "role",
    },
    {
      text: "Status",
      dataField: "status",
    },
    {
      text: "Action",
      dataField: "action",
    },
  ];

  const customTotal = (from, to, size) => (
    <span className='react-bootstrap-table-pagination-total'>
      Showing {from} to {to} of {size} Results
    </span>
  );

  const handleCancel = ()=>{
    navigate("/users")
  }

  const options = {
    paginationSize: 4,
    pageStartIndex: 0,
    // alwaysShowAllBtns: true, // Always show next and previous button
    // withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: "First",
    prePageText: "Back",
    nextPageText: "Next",
    lastPageText: "Last",
    nextPageTitle: "First page",
    prePageTitle: "Pre page",
    firstPageTitle: "Next page",
    lastPageTitle: "Last page",
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [
      {
        text: "5",
        value: 5,
      },
      {
        text: "10",
        value: 10,
      },
      {
        text: "All",
        value: members.length,
      },
    ], // A numeric array is also available. the purpose of above example is custom the text
  };

  return (
    <>
      <Row>
        <Col sm={4}>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as='h5'>Members</Card.Title>
                <span className='d-block m-t-5'>Select 1 or more Users</span>
              </Card.Header>
              <Card.Body>
                <Form.Group controlId='ticket_priority'>
                  <Form.Label>Users:</Form.Label>

                  <Form.Control
                    as='select'
                    multiple='multiple'
                    className='mb-3'
                  >
                    <option>Select...</option>
                    <option selected>Open this select menu</option>
                    <option value='1'>One</option>
                    <option value='2'>Two</option>
                    <option value='3'>Three</option>
                    <option value='1'>One</option>
                    <option value='2'>Two</option>
                    <option value='3'>Three</option>
                    <option value='3'>Three</option>
                    <option value='1'>One</option>
                    <option value='2'>Two</option>
                    <option value='3'>Three</option>
                    {/* {priorityOptions.map((t, i) => {
                          return <option value={i}>{t}</option>;
                        })} */}
                  </Form.Control>
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as='h5'>Roles</Card.Title>
                <span className='d-block m-t-5'>Select Role to assign</span>
              </Card.Header>
              <Card.Body>
              <Form.Group controlId='ticket_priority'>
                  <Form.Label>Role:</Form.Label>

                  <Form.Control
                    as='select'
                    className='mb-3'
                  >
                    <option>Select...</option>
                    <option selected>Open this select menu</option>
                    <option value='1'>One</option>
                    <option value='2'>Two</option>
                    <option value='3'>Three</option>
                    <option value='1'>One</option>
                    <option value='2'>Two</option>
                    <option value='3'>Three</option>
                    <option value='3'>Three</option>
                    <option value='1'>One</option>
                    <option value='2'>Two</option>
                    <option value='3'>Three</option>
                    {/* {priorityOptions.map((t, i) => {
                          return <option value={i}>{t}</option>;
                        })} */}
                  </Form.Control>
                </Form.Group>
                <Button variant='primary' type='submit'>
                      Submit
                    </Button>
                    <Button variant='light' onClick={handleCancel}>
                      Cancel
                    </Button>
              </Card.Body>
            </Card>


          </Col>
        </Col>

        <Col>
          <Card>
            <Card.Header>
              <Card.Title as='h5'>Member Profiles</Card.Title>
              <span className='d-block m-t-5'>Showing all users</span>

          
            </Card.Header>
            <Card.Body>
              <BootstrapTable
                striped
                hover
                keyField='id'
                data={members}
                columns={columns}
                pagination={paginationFactory(options)}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ManageRoles;
