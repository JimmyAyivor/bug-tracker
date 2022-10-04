import React from "react";
import { ProjectContext } from "../../contexts/ProjectContext";
import { useContext } from "react";
import { Row, Col, Card,} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { dateFormatter, actionsFormatter, priorityFormatter,statusFormatter } from "../../utils/helpers";

const Projects = () => {
  const [projects,] = useContext(ProjectContext);
  const allProjects = [...projects];
  const columns = [
    {
      text: " id",
      dataField: "id",
    },
    {
      text: "Title",
      dataField: "title",
    },
    {
      text: "Start Date",
      dataField: "created_at",
      formatter: dateFormatter
    },
    {
      text: "Priority",
      dataField: "priority",
      formatter: priorityFormatter

    },
    {
      text: "Deadline",
      dataField: "deadline",
      formatter:dateFormatter
    },
    {
      text: "Status",
      dataField: "status",
      formatter: statusFormatter
    },
    {
      text: "Actions",
      dataField: "project_actions",
      formatter: actionsFormatter
    }
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
        value: allProjects.length,
      },
    ], // A numeric array is also available. the purpose of above example is custom the text
  };

 

  return (
    <>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as='h5'>All Projects</Card.Title>
              <span className='d-block m-t-5'>
                Showing all projects
              </span>
            </Card.Header>
            <Card.Body>
              <BootstrapTable
                striped
                hover
                keyField='id'
                data={allProjects}
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

export default Projects;
