import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import { getFriendlyDate } from "../../utils/helpers";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { TicketContext } from "../../contexts/TicketContext";
import { useContext } from "react";
const API = process.env.REACT_APP_API_URL;
const ProjectDetails = () => {
  const [project, setProject] = useState([]);
  const [show, setShow] = useState(false);
  let { id } = useParams();
  const tickets = useContext(TicketContext);

  const projectTickects = tickets[0].filter(
    (ticket) => ticket.project_id === project.id
  );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const { title, description, priority, status, created_at, deadline } =
    project;

  useEffect(() => {
    let isMounted = true;
    axios
      .get(`${API}/projects/${id}`)
      .then((response) => {
        if (isMounted) setProject(response.data);
      })
      .catch((error) => console.error(error));
    return () => {
      isMounted = false;
    };
  }, [id, navigate]);

  const handleDelete = () => {
    axios
      .delete(`${API}/projects/${id}`)
      .then((response) => navigate(`/projects`))
      .catch((error) => console.projects(error));
    handleClose();
  };
  return (
    <>
      <Row>
        <Col>
          <Col md={6} xl={12}>
            <Card>
              <Card.Body>
                <h4 className='mb-4'>{title}</h4>
                <div className='row d-flex align-items-center'>
                  <div className='col-12'>
                    <h3 className='f-w-300 d-flex align-items-center m-b-0'>
                      <p>{description}</p>
                    </h3>
                  </div>
                </div>
                <div className='progress m-t-30' style={{ height: "12px" }}>
                  <div
                    className='progress-bar progress-c-theme'
                    role='progressbar'
                    style={{ width: "60%" }}
                    aria-valuenow='70'
                    aria-valuemin='0'
                    aria-valuemax='100'
                  />
                </div>
                <div className='row d-flex align-items-center'>
                  <div className='col-7'>
                    <h3 className='f-w-300 d-flex align-items-center m-b-0'>
                      <p className='m-b-0'>Project status</p>
                    </h3>
                  </div>

                  <div className='col-3 text-right'>
                    <p className='m-b-0'>70%</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} xl={12}>
            <Card>
              <Card.Body>
                <div className='row d-flex align-items-center'>
                  <div className='col-7'>
                    {/* <h6 className='f-w-500 d-flex align-items-center m-b-5'>
                  Project Type:
                </h6> */}
                  </div>
                  {/* <div className='col-3 text-right'>
              <Button variant="outline-danger" disabled>{project}</Button>
              </div> */}
                </div>
                <div className='row d-flex align-items-center'>
                  <div className='col-7'>
                    <h6 className='f-w-500 d-flex align-items-center m-b-5'>
                      Start Date:
                    </h6>
                  </div>

                  <div className='col-3 text-right'>
                    <h4 className='m-b-10'>
                      <Badge variant='success' disabled>
                        {getFriendlyDate(created_at)}
                      </Badge>
                    </h4>
                  </div>
                </div>

                <div className='row d-flex align-items-center'>
                  <div className='col-7'>
                    <h6 className='f-w-500 d-flex align-items-center m-b-5'>
                      Deadline:
                    </h6>
                  </div>

                  <div className='col-3 text-right'>
                    <h4 className='m-b-10'>
                      <Badge variant='danger'>
                        {getFriendlyDate(deadline)}
                      </Badge>
                    </h4>
                  </div>
                </div>
                <div className='row d-flex align-items-center'>
                  <div className='col-7'>
                    <h6 className='f-w-500 d-flex align-items-center m-b-5'>
                      Priority:
                    </h6>
                  </div>

                  <div className='col-3 text-right'>
                    <h4 className='m-b-10'>
                      <Badge variant='warning'>{priority}</Badge>
                    </h4>
                  </div>
                </div>

                <div className='row d-flex align-items-center'>
                  <div className='col-7'>
                    <h6 className='f-w-500 d-flex align-items-center m-b-5'>
                      Status:
                    </h6>
                  </div>

                  <div className='col-3 text-right'>
                    <h4 className='m-b-10'>
                      <Badge variant='info'>{status}</Badge>
                    </h4>
                  </div>
                </div>
                <div className='row d-flex align-items-center'>
                  {/* <div className='col-7'>
                <h6 className='f-w-500 d-flex align-items-center m-b-5'>
                  Submitted By:
                </h6>
              </div> */}

                  {/* <div className='col-3 text-right'>
                <p className='m-b-10'><Button variant="outline-warning" disabled>{user_id}</Button></p>
              </div> */}
                </div>
                <div className='row d-flex align-items-center'>
                  <div className='col-7'>
                    <h6 className='f-w-500 d-flex align-items-center m-b-5'>
                      Managed By:
                    </h6>
                  </div>

                  {/* <div className='col-3 text-right'>
                <p className='m-b-10'><Button variant="outline-danger" disabled>{user_id}</Button></p>
              </div> */}
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={12}>
            <Card>
              <Card.Body>
                <div className='row d-flex align-items-center'>
                  <div>
                    <Link to={`/projects`}>
                      <Button variant='secondary'>Back</Button>
                    </Link>
                  </div>
                  <div>
                    <Link to={`/projects/${id}/edit`}>
                      <Button>Edit</Button>
                    </Link>
                  </div>
                  <div>
                    <Button variant='outline-danger' onClick={handleShow}>
                      Delete
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <Modal show={show} handleDelete={handleDelete} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Delete Item</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete "{title}" ?
              </Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant='danger' onClick={handleDelete}>
                  Yes
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Col>
        <Col md={6} xl={8}>
          <Tickets data={projectTickects} />
        </Col>
      </Row>
    </>
  );
};

export default ProjectDetails;
