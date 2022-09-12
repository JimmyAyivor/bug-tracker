import React from "react";
import { TicketContext } from "../../contexts/TicketContext";
import { useContext } from "react";
import { Row, Col, Card } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import {
  dateFormatter,
  actionsFormatter,
  priorityFormatter,
} from "../../utils/helpers";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

const TicketTable = () => {
  const [tickets, setTickets] = useContext(TicketContext);

  const products = [...tickets];

  const { SearchBar } = Search;

  const columns = [
    {
      text: "ID",
      dataField: "id",
    },
    {
      text: "Title",
      dataField: "title",
    },
    {
      text: "Submitted By",
      dataField: "first_name",
    },
    {
      text: "Project",
      dataField: "project",
    },
    {
      text: "Ticket Type",
      dataField: "ticket_type",
    },
    {
      text: "Status",
      dataField: "status",
    },
    {
      text: "Priority",
      dataField: "priority",
      formatter: priorityFormatter,
    },
    {
      text: "Developer",
      dataField: "developer",
    },
    {
      text: "Last Updated",
      dataField: "created_at",
      formatter: dateFormatter,
    },

    {
      text: "Actions",
      dataField: "actions",
      formatter: actionsFormatter,
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
        value: products.length,
      },
    ], // A numeric array is also available. the purpose of above example is custom the text
  };

  // const afterSearch = (newResult) => {
  //   console.log(newResult);
  // };

  return (
    <>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as='h5'>All Tickets</Card.Title>
              <span className='d-block m-t-5'>Showing all tickets</span>
            </Card.Header>
            <Card.Body>
              <BootstrapTable
                striped
                hover
                keyField='id'
                data={products}
                columns={columns}
                pagination={paginationFactory(options)}
              />
{/* 
              <ToolkitProvider
                striped
                hover
                keyField='id'
                data={products}
                columns={columns}
                pagination={paginationFactory(options)}
                search
              >
                {(props) => (
                  <div>
                    <h3>Input something at below input field:</h3>
                    <SearchBar {...props.searchProps} />
                    <hr />
                    <BootstrapTable {...props.baseProps} />
                  </div>
                )}
              </ToolkitProvider> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default TicketTable;
