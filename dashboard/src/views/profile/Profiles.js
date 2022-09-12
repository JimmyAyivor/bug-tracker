import React from "react";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import { Row, Col, Card} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const MembersTable = () => {
  const [users,] = useContext(UserContext);

  const members = [...users];
  

  const columns = [
    {
      text: "#",
      dataField: "id",
    },
    {
      text: "Avatar",
      dataField: "avatar",
    },
    {
      text: "Full Name",
      dataField: "first_name",
    },
    {
      text: "Role ",
      dataField: "role",
    },
    {
      text: "Email",
      dataField: "email",
    },
    {
      text: "Mobile",
      dataField: "mobile",
    },
    {
      text: "Actions",
      dataField: "action",
    },
  ];

  const customTotal = (from, to, size) => (
    <span className='react-bootstrap-table-pagination-total'>
      Showing {from} to {to} of {size} Results
    </span>
  );

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

export default MembersTable;
