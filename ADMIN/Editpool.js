import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Editpool = ({ isOpen, onClose, poolID }) => {
    const nav = useNavigate();
    const [editpool, setEditpool] = useState({
        image: null,
        Name: '',
        Location: '',
        Status: '',
    });

    
    useEffect(() => {
        if (poolID) {
            axios.get(`http://localhost:8000/getpool/${poolID}`).then((response) => {
                const data = response.data;
                setEditpool({
                    image: null, 
                    Name: data.name || '',
                    Location: data.location || '',
                    Status: data.status || '',
                });
            }).catch(err => console.error('Error fetching pool:', err));
        }
    }, [poolID]);

    // Handle form submission
    const edit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (editpool.image) {
            formData.append('image', editpool.image[0]);
        }
        formData.append('name', editpool.Name);
        formData.append('location', editpool.Location);
        formData.append('status', editpool.Status);
        formData.append('id', poolID);

        try {
            const response = await axios.post(`http://localhost:8000/editpool_post`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            if (response.data.status === 'sucesseditpool') {
                alert('Pool edited successfully');
                onClose(); // Close the modal
                nav('/pools'); // Navigate back to pools page
                window.location.reload();
            }
        } catch (error) {
            console.error('Error editing pool:', error);
        }
    };

    if (!isOpen) return null; 

    const close = () => {
        onClose(); 
    };

    return (
        <div className="modal-overlay">
            <div className="edit-modal">
                <form className="edit-form" onSubmit={edit}>
                    <button type="button" className="close-button" onClick={close}>
                        &times;
                    </button>
                    <h3>Edit Pool</h3>
                    <div className="form-group">
                        <label>Image</label>
                        <input
                            type="file"
                            onChange={(e) => setEditpool({ ...editpool, image: e.target.files })}
                        />
                        <label>Name</label>
                        <input
                            type="text"
                            value={editpool.Name}
                            onChange={(e) => setEditpool({ ...editpool, Name: e.target.value })}
                        />
                        <label>Location</label>
                        <input
                            type="text"
                            value={editpool.Location}
                            onChange={(e) => setEditpool({ ...editpool, Location: e.target.value })}
                        />
                        <label>Status</label>
                        <input
                            type="text"
                            value={editpool.Status} 
                            onChange={(e) => setEditpool({ ...editpool, Status: e.target.value })}
                        />
                    </div>
                    <button type="submit" className="update-button">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Editpool;
