import { useState } from 'react';
import { Nav, Modal, Tab } from 'react-bootstrap';
import LoginForm from './LoginForm';
import SignUpForm from './SignupForm';

interface ModalProps {
    showModal: boolean;
    onClose: () => void;
}

const modal = ({ showModal, onClose }: ModalProps) => {
    const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

    return (
        <Modal
        size="lg"
        show={showModal}
        onHide={onClose}
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
    )
}
export default modal;