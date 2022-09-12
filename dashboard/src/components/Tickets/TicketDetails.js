import { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Card, Col } from "react-bootstrap";
import { getFriendlyDate } from "../../utils/helpers";
import axios from "axios";
const API = process.env.REACT_APP_API_URL;
const TicketDetails = () => {
  
  const [ticket, setTicket] = useState([]);
  let { id } = useParams();

  const navigate = useHistory();
  const {
    title,
    description,
    priority_id,
    status_id,
    user_id,
    created_at,
    deadline,
    ticket_type_id,
  } = ticket;
  
  useEffect(() => {
    let isMounted = true;
    axios
    .get(`${API}/tickets/${id}`)
    .then((response) => {
      if (isMounted) setTicket(response.data);
    })
    .catch((error) => console.error(error));
    return () => {
      isMounted = false;
    };
  }, []);
  
  const handleDelete = () => {
    axios
      .delete(`${API}/tickets/${id}`)
      .then((response) =>  navigate.push(`/app/dashboard/default`))
      .catch((error) => console.snack(error));
  };
  return (
    <article className='Show'>
      <Col xl={6}>
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
              <div className='col-9'>
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
      <Col xl={6}>
        <Card>
          <Card.Body>
            <div className='row d-flex align-items-center'>
              <div className='col-9'>
                <h6 className='f-w-500 d-flex align-items-center m-b-5'>
                  Ticket Type:
                </h6>
              </div>
              <div className='col-3 text-right'>
              <Button variant="outline-danger" disabled>{ticket_type_id}</Button>
              </div>
            </div>
            <div className='row d-flex align-items-center'>
              <div className='col-9'>
                <h6 className='f-w-500 d-flex align-items-center m-b-5'>
                  Start Date:
                </h6>
              </div>

              <div className='col-3 text-right'>
                <p className='m-b-10'><Button variant="outline-success" disabled>{getFriendlyDate(created_at)}</Button></p>
              </div>
            </div>

            <div className='row d-flex align-items-center'>
              <div className='col-9'>
                <h6 className='f-w-500 d-flex align-items-center m-b-5'>
                  Deadline:
                </h6>
              </div>

              <div className='col-3 text-right'>
                <p className='m-b-10'><Button variant="outline-secondary" disabled>{getFriendlyDate(created_at)}</Button></p>
              </div>
            </div>
            <div className='row d-flex align-items-center'>
              <div className='col-9'>
                <h6 className='f-w-500 d-flex align-items-center m-b-5'>
                  Priority:
                </h6>
              </div>

              <div className='col-3 text-right'>
                <p className='m-b-10'><Button variant="outline-warning" disabled>{priority_id}</Button></p>
              </div>
            </div>

            <div className='row d-flex align-items-center'>
              <div className='col-9'>
                <h6 className='f-w-500 d-flex align-items-center m-b-5'>
                  Status:
                </h6>
              </div>

              <div className='col-3 text-right'>
                <p className='m-b-10'><Button variant="outline-secondary" disabled>{status_id}</Button></p>
              </div>
            </div>
            <div className='row d-flex align-items-center'>
              <div className='col-9'>
                <h6 className='f-w-500 d-flex align-items-center m-b-5'>
                  Submitted By:
                </h6>
              </div>

              <div className='col-3 text-right'>
                <p className='m-b-10'><Button variant="outline-warning" disabled>{user_id}</Button></p>
              </div>
            </div>
            <div className='row d-flex align-items-center'>
              <div className='col-9'>
                <h6 className='f-w-500 d-flex align-items-center m-b-5'>
                  Assigned to Developer:
                </h6>
              </div>

              <div className='col-3 text-right'>
                <p className='m-b-10'><Button variant="outline-danger" disabled>{user_id}</Button></p>
              </div>
            </div>

          </Card.Body>
        </Card>
      </Col>
      <Col xl={6}>
        <Card>
          <Card.Body>
            <div className='row d-flex align-items-center'>
              <div>
                <Link to={`/tickets`}>
                  <Button variant="secondary" >Back</Button>
                </Link>
              </div>
              <div>
                <Link to={`/tickets/${id}/edit`}>
                  <Button>Edit</Button>
                </Link>
              </div>
              <div>
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <aside></aside>
    </article>
  );
};

export default TicketDetails;
