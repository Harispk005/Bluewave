import React, { useState } from 'react';
import './Footer.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt, faGlobe, faExclamationCircle ,faComment} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

const Footers = () => {
  const nav = useNavigate();
  const [show, setShow] = useState(false);
  const [complaint, setComplaint] = useState("");
  const lid = sessionStorage.getItem('lid');
  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const sendComplaint = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/user/complaint_post', { complaint, lid, });
      if (response.data.status === "successcomplaint") {
        alert("Complaint sent successfully");
        handleClose();
        setComplaint("");
      } else {
        alert("Failed to send complaint. Please try again.");
      }
    } catch (error) {
      console.error("There was an error sending the complaint:", error);
      alert("Error in sending complaint. Please try again later.");
    }
  };
  const feedback = async (e) => {
    nav('/feedback');
  }
  

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2 className='hd'>BLUEWAVE</h2>
          <p>"Blue Wave is a dynamic platform dedicated to enhancing the swimming experience for users of all levels. Our mission is to provide easy access to a wide range of swimming facilities, from booking pool slots to participating in competitive events and training sessions. With a focus on convenience and quality, Blue Wave connects users with nearby swimming pools, professional training programs, and exciting competitions. We aim to make swimming accessible, enjoyable, and safe for everyone, fostering a community that values health, fitness, and aquatic sports."</p>
        </div>

        <div className="footer-section contact">
          <span className='span'>Contact us</span>
          <br /><br />
          <p><FontAwesomeIcon icon={faPhone} /> +91 9876543210</p>
          <p><FontAwesomeIcon icon={faEnvelope} /> admin@BlueWave.com</p>
          <p><FontAwesomeIcon icon={faMapMarkerAlt} /> 123 Main Street, City, Country</p>
          <p><FontAwesomeIcon icon={faGlobe} /> www.BlueWave.com</p>
          <p onClick={handleShow} style={{ cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faExclamationCircle} /> Report Complaint
          </p>
          <p onClick={feedback}style={{ cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faComment} /> Share your thoughts about us

          </p>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Complaints</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={sendComplaint}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Send your complaint</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={complaint}
                    onChange={(e) => setComplaint(e.target.value)}
                    rows={3}
                  />
                </Form.Group>
                <Modal.Footer>
                  <Button variant="primary" type="submit" className='cbtn'>
                    Send
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal>
        </div>

        <div className="footer-section terms">
          <span className='rt'>Terms and Conditions</span>
          <br /><br />
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
          <p>Cookie Policy</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 BlueWave | All Rights Reserved</p>
        <div className="socials">
          <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
          <a href="https://www.instagram.com/_haris__609/profilecard/?igsh=MWtweWpneHc4YzZwbg=="><FontAwesomeIcon icon={faInstagram} /></a>
          <a href="#"><FontAwesomeIcon icon={faXTwitter} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footers;
