import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Replymodal({ id , replydata}) {
    const [show, setShow] = useState(false);
    const [sendreply, setSendreply] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);  
  

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const reply = async (e) => {
        e.preventDefault();  

        try {
            setIsSubmitting(true);  
            const response = await axios.post('http://localhost:8000/reply_post', {
                id,
                reply: sendreply
            });

            if(response.data.status === "sucessreply"){
                alert("Reply sent successfully");
                window.location.reload();
            }


            
            setShow(false);
            setSendreply('');  
        } catch (error) {
            console.error("Error posting reply:", error);
        } finally {
            setIsSubmitting(false);  
        }
    };
    if(replydata !=="pending"){
        return null;
        
    }
    

    return (
        <>
      
            <Button  style={{background:"none",outline:"none",color:"black",borderRadius:"50px",marginTop:"20px"}} onClick={handleShow}>
                Send Reply
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> Send Reply</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={reply}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Your Reply</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={sendreply}
                                onChange={(e) => setSendreply(e.target.value)}
                                disabled={isSubmitting}  
                            />
                        </Form.Group>
                        <Button type="submit" style={{background:"none",outline:"none",color:"black",borderRadius:"50px"} }  disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit Reply'}
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Replymodal;
