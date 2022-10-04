import React from "react";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import { Row, Col, Card} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { avatarFormatter, dateFormatter } from "../../utils/helpers";
const Users = () => {
  const [users,] = useContext(UserContext);

  const members = [...users];
  

  const columns = [
    {
      text: "#",
      dataField: "id",
    },
    {
      text: "Name",
      dataField: "avatar",
      formatter:avatarFormatter
    },
    {
      text: "Date Created",
      dataField: "created_at",
      formatter:dateFormatter

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
              <div class="col-xs-7">
                        <a href="#" class="btn btn-primary"><i class="material-icons">&#xE147;</i> <span>Add New User</span></a>
                        <a href="#" class="btn btn-primary"><i class="material-icons">&#xE24D;</i> <span>Export to Excel</span></a>						
                    </div>
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

export default Users;
