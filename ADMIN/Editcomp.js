import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Editcomp = ({ isOpen, onClose, editid }) => {
    const nav = useNavigate();
  
    

    const [Editcomp, setEditcomp] = useState({})



    // console.log(editid);
    
  
 
    
    useEffect(() => 
      {
        if (editid)
           {
             const fetchdata = async () => 
              {
                 await axios.get(`http://localhost:8000/getcompetition`, { params: { id: editid } }).then((response) => {
                   const data = response.data.data;
                  //  console.log(response.data.data);
                   
                   setEditcomp({
                     compimage: null,
                     compname: data.name || '',
                     organizer: data.organizer || '',
                     date: data.date || '',
                     venue: data.venue || '',
                     checkin: data.time || '',
                     agegroup: data.agegroup || '',
                     regfee: data.regfee || '',
                     contactno: data.contactno || '',
                     prize: data.prize || '',
                   });
                 });
              }
             fetchdata(); 
           }
      },[editid])
    
    const edit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
     
        formData.append('compimage', Editcomp.compimage);
        formData.append('id', editid);
        formData.append('compname', Editcomp.compname);
        formData.append('organizer', Editcomp.organizer);
        formData.append('date', Editcomp.date);
        formData.append('venue', Editcomp.venue);
        formData.append('checkin', Editcomp.checkin);
        formData.append('agegroup', Editcomp.agegroup);
        formData.append('regfee', Editcomp.regfee);
        formData.append('contactno', Editcomp.contactno);
        formData.append('prize', Editcomp.prize);
    
        try {
          const response = await axios.post('http://localhost:8000/editcompetition_post', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
           
    
            if (response.data.status === 'sucesseditcomp') {
                alert('Competition updated successfully');
                onClose(); 
                nav('/managecomp'); 
                window.location.reload();
            }
        } catch (error) {
            console.error('Error updating competition:', error);
        }
    };

    console.log(Editcomp);
    
    
  
    if (!isOpen) {
      return null; 
    }
  
    return (
      <div className="modal-overlay">
        <div className="edit-modal">
          <form className="edit-form" onSubmit={edit}>
            <button type="button" className="close-button" onClick={onClose}>
              &times;
            </button>
            <h3>Edit Competition</h3>
            <div className="form-group">
              <label>Competition Image</label>
              <input type="file"  onChange={(e) => setEditcomp({ ...Editcomp, compimage: e.target.files[0] })} />
              <label>Competition Name</label>
              <input type="text" value={Editcomp.compname} onChange={(e) => setEditcomp({ ...Editcomp, compname: e.target.value })} />
              <label>Organizer</label>
              <input type="text" value={Editcomp.organizer} onChange={(e) => setEditcomp({ ...Editcomp, organizer: e.target.value })} />
              <label>Date</label>
              <input type="date" value={Editcomp.date} onChange={(e) => setEditcomp({ ...Editcomp, date: e.target.value })} />
              <label>Venue</label>
              <input type="text" value={Editcomp.venue} onChange={(e) => setEditcomp({ ...Editcomp, venue: e.target.value })} />
              <label>Checkin Time</label>
              <input type="time" value={Editcomp.checkin} onChange={(e) => setEditcomp({ ...Editcomp, checkin: e.target.value })} />
              <label>Age Group</label>
              <input type="text" value={Editcomp.agegroup} onChange={(e) => setEditcomp({ ...Editcomp, agegroup: e.target.value })} />
              <label>Registration Fee</label>
              <input type="text" value={Editcomp.regfee} onChange={(e) => setEditcomp({ ...Editcomp, regfee: e.target.value })} />
              <label>Prize</label>
              <input type="text" value={Editcomp.prize} onChange={(e) => setEditcomp({ ...Editcomp, prize: e.target.value })} />
              <label>Contact No</label>
              <input type="text" value={Editcomp.contactno} onChange={(e) => setEditcomp({ ...Editcomp, contactno: e.target.value })} />
            </div>
            <button type="submit" className="update-button">Update</button>
          </form>
        </div>
      </div>
    );
  };
  
  export default Editcomp;
  