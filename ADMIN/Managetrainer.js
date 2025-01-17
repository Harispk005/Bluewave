import React, { useEffect, useState } from 'react';
import './Managetrainer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faUserPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Table from './Table';

import Search from './Search';

const Managetrainer = () => {
  const nav = useNavigate();
  const [viewtrainer, setViewtrainer] = useState([]);



  const addtrainer = () => {
    nav('/signuptrainer');
  };
  const goback = () => {
    nav('/adminhome');
  }

  useEffect(() => {
    axios.get("http://localhost:8000/gettrainers")
      .then((response) => {
        if (response.data.data) {
          setViewtrainer(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching trainers:", error);
      });
  }, []);

  const deletetrainer = (id) => {
    console.log(id);

    axios.get("http://localhost:8000/deletetrainer", { params: { id: id } })
      .then((response) => {
        if (response.data.status === "sucessdeletetrainer") {
          alert("Trainer deleted successfully");
          window.location.reload();
        }
      })

  };
  const edit = () => {
    nav('/edittrainer')
  }

  const[searchquerry,setSearchquery]=useState('');

  return (

    <div className="manage-users">
      <header className="admin-header">
        <h1>Manage Trainers</h1>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Search searchquerry={searchquerry} setSearchquery={setSearchquery} />
          <button className="add-user-btn" onClick={addtrainer} >
            <FontAwesomeIcon icon={faUserPlus} /> Add Trainers
          </button>
          <button className='add-user-btn' onClick={goback}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </div>
      </header>
      <Table viewtrainer={viewtrainer} deletetrainer={deletetrainer} edit={edit} searchquerry={searchquerry}/>
     
    </div>

  );
};

export default Managetrainer;
