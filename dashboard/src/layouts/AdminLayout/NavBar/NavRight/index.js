import React, { useContext, useState } from "react";
import { ListGroup, Dropdown, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";

import ChatList from "./ChatList";
import { ConfigContext } from "../../../../contexts/ConfigContext";
import useAuth from "../../../../hooks/useAuth";

import avatar1 from "../../../../assets/images/user/avatar-1.jpg";
import avatar2 from "../../../../assets/images/user/avatar-2.jpg";
import avatar3 from "../../../../assets/images/user/avatar-3.jpg";
import avatar4 from "../../../../assets/images/user/avatar-4.jpg";

const NavRight = () => {
  const configContext = useContext(ConfigContext);
  const { logout, user } = useAuth();
  const { rtlLayout } = configContext.state;
  const [listOpen, setListOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      //handleClose();
      await logout();
      navigate("/signin");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <React.Fragment>
      <ListGroup
        as='ul'
        bsPrefix=' '
        className='navbar-nav ml-auto'
        id='navbar-right'
      >
        <ListGroup.Item as='li' bsPrefix=' '>
          <Dropdown >
            <Dropdown.Toggle
              as={Link}
              variant='link'
              to='#'
              id='dropdown-basic'
            >
              <i className='feather icon-bell icon' />
            </Dropdown.Toggle>
            <Dropdown.Menu
              alignRight
              className='notification notification-scroll'
            >
              <div className='noti-head'>
                <h6 className='d-inline-block m-b-0'>Notifications</h6>
                <div className='float-right'>
                  <Link to='#' className='m-r-10'>
                    mark as read
                  </Link>
                  <Link to='#'>clear all</Link>
                </div>
              </div>
              <PerfectScrollbar>
                <ListGroup
                  as='ul'
                  bsPrefix=' '
                  variant='flush'
                  className='noti-body'
                >
                  <ListGroup.Item as='li' bsPrefix=' ' className='n-title'>
                    <p className='m-b-0'>NEW</p>
                  </ListGroup.Item>
                  <ListGroup.Item as='li' bsPrefix=' ' className='notification'>
                    <Card>
                      <img
                        className='img-radius'
                        src={avatar1}
                        alt='Generic placeholder'
                      />
                      <Card.Body>
                        <p>
                          <strong>John Doe</strong>
                          <span className='n-time text-muted'>
                            <i className='icon feather icon-clock m-r-10' />
                            30 min
                          </span>
                        </p>
                        <p>New ticket Added</p>
                      </Card.Body>
                    </Card>
                  </ListGroup.Item>
                  <ListGroup.Item as='li' bsPrefix=' ' className='n-title'>
                    <p className='m-b-0'>EARLIER</p>
                  </ListGroup.Item>
                  <ListGroup.Item as='li' bsPrefix=' ' className='notification'>
                    <Card>
                      <img
                        className='img-radius'
                        src={avatar2}
                        alt='Generic placeholder'
                      />
                      <Card.Body>
                        <p>
                          <strong>Joseph William</strong>
                          <span className='n-time text-muted'>
                            <i className='icon feather icon-clock m-r-10' />
                            30 min
                          </span>
                        </p>
                        <p>Purchase New Theme and make payment</p>
                      </Card.Body>
                    </Card>
                  </ListGroup.Item>
                  <ListGroup.Item as='li' bsPrefix=' ' className='notification'>
                    <Card>
                      <img
                        className='img-radius'
                        src={avatar3}
                        alt='Generic placeholder'
                      />
                      <Card.Body>
                        <p>
                          <strong>Sara Soudein</strong>
                          <span className='n-time text-muted'>
                            <i className='icon feather icon-clock m-r-10' />
                            30 min
                          </span>
                        </p>
                        <p>currently login</p>
                      </Card.Body>
                    </Card>
                  </ListGroup.Item>
                  <ListGroup.Item as='li' bsPrefix=' ' className='notification'>
                    <Card>
                      <img
                        className='img-radius'
                        src={avatar4}
                        alt='Generic placeholder'
                      />
                      <Card.Body>
                        <p>
                          <strong>Suzen</strong>
                          <span className='n-time text-muted'>
                            <i className='icon feather icon-clock m-r-10' />
                            yesterday
                          </span>
                        </p>
                        <p>Purchase New Theme and make payment</p>
                      </Card.Body>
                    </Card>
                  </ListGroup.Item>
                </ListGroup>
              </PerfectScrollbar>
              <div className='noti-footer'>
                <Link to='#'>show all</Link>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </ListGroup.Item>
        <ListGroup.Item as='li' bsPrefix=' '>
          <Dropdown>
            <Dropdown.Toggle
              as={Link}
              variant='link'
              to='#'
              className='displayChatbox'
              onClick={() => setListOpen(true)}
            >
              <i className='icon feather icon-mail' />
            </Dropdown.Toggle>
          </Dropdown>
        </ListGroup.Item>
        <ListGroup.Item as='li' bsPrefix=' '>
          <Dropdown  className='drp-user'>
            <Dropdown.Toggle
              as={Link}
              variant='link'
              to='#'
              id='dropdown-basic'
            >
              <i className='icon feather icon-settings' />
            </Dropdown.Toggle>
            <Dropdown.Menu  className='profile-notification'>
              <div className='pro-head'>
                <img
                  src={user ? user.photoURL : avatar1}
                  className='img-radius'
                  alt='User Profile'
                />
                <span>{user && user.displayName }</span>
                <Link
                  to='#'
                  className='dud-logout'
                  title='Logout'
                  onClick={handleLogout}
                >
                  <i className='feather icon-log-out' />
                </Link>
              </div>
              <ListGroup
                as='ul'
                bsPrefix=' '
                variant='flush'
                className='pro-body'
              >
                <ListGroup.Item as='li' bsPrefix=' '>
                  <Link to='/profile/settings' className='dropdown-item'>
                    <i className='feather icon-settings' /> Settings
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item as='li' bsPrefix=' '>
                  <Link to='/profile' className='dropdown-item'>
                    <i className='feather icon-user' /> Profile
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item as='li' bsPrefix=' '>
                  <Link to='#' className='dropdown-item'>
                    <i className='feather icon-mail' /> My Messages
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item as='li' bsPrefix=' '>
                  <Link to='#' className='dropdown-item' onClick={handleLogout}>
                    <i className='feather icon-log-out' /> Logout
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </Dropdown.Menu>
          </Dropdown>
        </ListGroup.Item>
      </ListGroup>
      <ChatList listOpen={listOpen} closed={() => setListOpen(false)} />
    </React.Fragment>
  );
};

export default NavRight;
