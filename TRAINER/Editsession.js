import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Editsession = ({ isOpen, onClose, editid }) => {
    const [editsession, setEditsession] = useState({
        date: '',
        fromtime: '',
        totime: ''
    });

    useEffect(() => {
        if (editid) {
            axios.get(`http://localhost:8000/trainer/editsession`,{params:{id:editid}})
            .then((response) => {
                const data = response.data.data;
                setEditsession({
                    date: data.date,
                    fromtime: data.fromtime,
                    totime: data.totime
                });
            });
        }
    }, [editid]);

    const edit = async (e) => {
        e.preventDefault();
        const formData = {
            date: editsession.date,
            fromtime: editsession.fromtime,
            totime: editsession.totime,
            id: editid
        };

        const response = await axios.post('http://localhost:8000/trainer/editsession_post',formData);

        if (response.data.status === 'successeditsession') {
            alert('Session updated successfully');
            onClose();
            window.location.reload();
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="edit-modal">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <form className="edit-form" onSubmit={edit}>
                    <h3>Edit Sessions</h3>
                    <div className="form-group">
                        <label>Date:</label>
                        <input
                            type="date"
                            value={editsession.date}
                            onChange={(e) =>
                                setEditsession({ ...editsession, date: e.target.value })
                            }
                        />
                        <label>From Time:</label>
                        <input
                            type="time"
                            value={editsession.fromtime}
                            onChange={(e) =>
                                setEditsession({ ...editsession, fromtime: e.target.value })
                            }
                        />
                        <label>To Time:</label>
                        <input
                            type="time"
                            value={editsession.totime}
                            onChange={(e) =>
                                setEditsession({ ...editsession, totime: e.target.value })
                            }
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

export default Editsession;
