import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  const handleModalOpen = (tab: 'login' | 'signup') => {
    setActiveTab(tab);
    setShowModal(true);
  };

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            Campground and Hiking Search
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar' className='d-flex flex-row-reverse'>
            <Nav className='ml-auto d-flex'>
              <Nav.Link as={Link} to='/'>
                Search for areas near you!
              </Nav.Link>
              {/* if user is logged in show saved places and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to="/saved">See Your Places</Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link onClick={() => handleModalOpen('login')}>Log In</Nav.Link>
                  <Nav.Link onClick={() => handleModalOpen('signup')}>Sign Up</Nav.Link>
                  <Nav.Link onClick={() => handleModalOpen('login')}>See Your Places</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="auth-modal"
      >
        <Tab.Container activeKey={activeTab} onSelect={(tab) => setActiveTab(tab as 'login' | 'signup')}>
          <Modal.Header closeButton>
            <Modal.Title id="auth-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};


export default AppNavbar;
