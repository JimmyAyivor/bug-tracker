import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import { getFriendlyDate } from "../../utils/helpers";
import axios from "axios";
const API = process.env.REACT_APP_API_URL;
const TicketDetails = () => {
  const [ticket, setTicket] = useState([]);
  let { id } = useParams();

  const navigate = useNavigate();
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
  }, [id]);

  const handleDelete = () => {
    axios
      .delete(`${API}/tickets/${id}`)
      .then((response) => navigate(`/app/dashboard/default`))
      .catch((error) => console.snack(error));
  };
  return (
  <Row>
      <Col xl={4}>
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
        
            <div className='row d-flex align-items-center'>
              <div className='col-9'>
                <h6 className='f-w-500 d-flex align-items-center m-b-5'>
                  Ticket Type:
                </h6>
              </div>
              <div className='col-3 text-right'>
                <Badge variant='danger' >
                  {ticket_type_id}
                </Badge>
              </div>
            </div>
            <div className='row d-flex align-items-center'>
              <div className='col-9'>
                <h6 className='f-w-500 d-flex align-items-center m-b-5'>
                  Start Date:
                </h6>
              </div>

              <div className='col-3 text-right'>
                <p className='m-b-10'>
                  <Badge variant='success'>
                    {getFriendlyDate(created_at)}
                  </Badge>
                </p>
              </div>
            </div>

            <div className='row d-flex align-items-center'>
              <div className='col-9'>
                <h6 className='f-w-500 d-flex align-items-center m-b-5'>
                  Deadline:
                </h6>
              </div>

              <div className='col-3 text-right'>
                <p className='m-b-10'>
                  <Badge variant='secondary' >
                    {getFriendlyDate(deadline)}
                  </Badge>
                </p>
              </div>
            </div>
            <div className='row d-flex align-items-center'>
              <div className='col-9'>
                <h6 className='f-w-500 d-flex align-items-center m-b-5'>
                  Priority:
                </h6>
              </div>

              <div className='col-3 text-right'>
               
                <Badge variant='warning'>{priority_id}</Badge>
                  
               
              </div>
            </div>

            <div className='row d-flex align-items-center'>
              <div className='col-9'>
                <h6 className='f-w-500 d-flex align-items-center m-b-5'>
                  Status:
                </h6>
              </div>

              <div className='col-3 text-right'>
                
                  <Badge variant='secondary' >
                    {status_id}
                  </Badge>
                 
             
              </div>
            </div>
            <div className='row d-flex align-items-center'>
              <div className='col-9'>
                <h6 className='f-w-500 d-flex align-items-center m-b-5'>
                  Submitted By:
                </h6>
              </div>

              <div className='col-3 text-right'>
                
                  <Badge variant='warning'>
                    {user_id}
                  </Badge>
                
              </div>
            </div>
            <div className='row d-flex align-items-center'>
              <div className='col-9'>
                <h6 className='f-w-500 d-flex align-items-center m-b-5'>
                  Assigned to Developer:
                </h6>
              </div>

              <div className='col-3 text-right'>
           
                  <Badge variant='danger' >
                    {user_id}
                  </Badge>
               
              </div>
            </div>
          
            <div className='row d-flex align-items-center'>
              <div>
                <Link to={`/tickets`}>
                  <Button variant='secondary'>Back</Button>
                </Link>
              </div>
              <div>
                <Link to={`/tickets/${id}/edit`}>
                  <Button>Edit</Button>
                </Link>
              </div>
              <div>
                <Button variant='danger' onClick={handleDelete}>
                  Delete
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col xl={8}>
        <Card>
        <Card.Body>
            <h4 className='mb-4'>Ticket Comments</h4>
            <div className='row d-flex align-items-center'>
         
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col xl={6}>
        <Card>
          <Card.Body>
            <h4 className='mb-4'>Ticket History</h4>
            <div className='row d-flex align-items-center'>
         
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col xl={6}>
        <Card>
        <Card.Body>
            <h4 className='mb-4'>Ticket Attachments</h4>
            <div className='row d-flex align-items-center'>
         
            </div>
          </Card.Body>
        </Card>
      </Col>
  </Row>
  );
}
export default TicketDetails;
