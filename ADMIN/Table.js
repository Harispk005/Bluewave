import React from 'react'
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { useNavigate } from 'react-router-dom';


const Table = ({ viewtrainer, deletetrainer, searchquerry }) => {
    const imgurl = 'http://localhost:8000/';
    const nav = useNavigate();
    const filterdata = viewtrainer.filter((item) => item.name.toLowerCase().includes(searchquerry.toLowerCase()));
        console.log(filterdata);
        
    
    return (
        <div>
          <div className="table-container">
    <table className="user-table">
        <thead>
            <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Qualification</th>
                <th>Skills</th>
                <th>Experience</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {filterdata && filterdata.length > 0 ? (
                filterdata.map((item) => (
                    <tr className="trai" key={item.id}>
                        <td>
                            <Col xs={6} md={4}>
                                <Image src={imgurl + item.image} rounded height="80px" width={140} />
                            </Col>
                        </td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.gender}</td>
                        <td>{item.age}</td>
                        <td>{item.qualification}</td>
                        <td>{item.skills}</td>
                        <td>{item.experience}</td>
                        <td>
                            <button className="edit-btn" onClick={() => { nav(`/edittrainer/${item._id}`) }}>Edit</button>
                            <button className="delete-btn" onClick={() => deletetrainer(item._id)}>Delete</button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="10">No trainers found.</td>
                </tr>
            )}
        </tbody>
    </table>
</div>

        </div>
    )
}

export default Table