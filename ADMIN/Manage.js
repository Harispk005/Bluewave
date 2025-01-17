import React from 'react';
import { Navbar, Nav, Accordion, Card } from 'react-bootstrap';
import './manage.css';  // You can style this based on your design

const Manage = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="sidebar">
        <Navbar bg="dark" variant="dark" className="flex-column">
          <Navbar.Brand href="#">React Bootstrap</Navbar.Brand>
          <Nav className="flex-column">
            <Accordion>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  Getting Started
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <Nav.Link href="#">Overview</Nav.Link>
                    <Nav.Link href="#">Installation</Nav.Link>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                  Layout
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <Nav.Link href="#">Breakpoints</Nav.Link>
                    <Nav.Link href="#">Grid</Nav.Link>
                    <Nav.Link href="#">Stacks</Nav.Link>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="2">
                  Forms
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                  <Card.Body>
                    <Nav.Link href="#">Form Controls</Nav.Link>
                    <Nav.Link href="#">Form Layout</Nav.Link>
                    <Nav.Link href="#">Validation</Nav.Link>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Nav>
        </Navbar>
      </div>

      {/* Main Content */}
      <div className="content">
        <h1>Welcome to the React-Bootstrap Sidebar</h1>
        <p>This is your main content area.</p>
      </div>
    </div>
  );
};

export default Manage;
