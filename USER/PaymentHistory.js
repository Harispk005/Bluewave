import React, { useEffect, useState } from 'react'
import './PaymentHistory.css'
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';

const PaymentHistory = () => {
    const[paymenthistory,setPaymentHistory]=useState([]);

    const lid=sessionStorage.getItem('lid');
    const nav=useNavigate();  
   

    useEffect(() => {
        axios.get('http://localhost:8000/user/paymenthistory', {params:{lid}})
        .then((response) => {
            setPaymentHistory(response.data.data);
            console.log(response.data.data);
        })
    },[]);

    const DownloadPDF = (item) => {
        const doc= new jsPDF();

        doc.setFontSize(18);
        doc.text(" Payment Invoice",105,20,{align:'center' ,bold:'true'});

        doc.setFontSize(12);
        doc.text("Bluewave Swimming Pool",20,30);
        doc.text("Address: 123 Blue Street, Water City, 456789", 20, 35);
        doc.text("Email: contact@bluewave.com", 20, 40);
        doc.text("Phone: +1 234 567 890", 20, 45);
    
        doc.setFontSize(14);
        doc.text('Payment Details',20,60);


        doc.text(`Payment ID: ${item._id}`,20,70);
        doc.text(`Amount:${item.amount}`,20,80);
        doc.text(`Date And Time: ${item.date}`,20,90);
        doc.text(`Payment Status: ${item.status}`,20,100);


        const tableColumns = ["Payment ID", "Amount", "Date And Time", "Status"];    
        const tableRows = [
            [item._id, item.amount, item.date, item.status],
        ]
        
        doc.autoTable({
            head:[tableColumns],
            body:tableRows,
            startY: 150

        });

        const pageHeight = doc.internal.pageSize.height;
         doc.setFontSize(10);
         doc.text("Thank you for choosing Blue Wave!", 20, pageHeight - 20);
         doc.text("For support, contact us at +1 234 567 890 or support@bluewave.com", 20, pageHeight - 15);


        doc.save(`invoice_${item._id}.pdf`);


    }

  return (
    <div className='hist'>
        <h1 className='histhd'>Payment History</h1>
        <button className="close-modal-btn" style={{ color: "black" }} onClick={() => nav(-1)}>
        &times;
      </button>
        {paymenthistory.map((item) => (
        <div className='histcard'> 

    
        <div className='grdgrd'>
            <div>
            <h5 className='rtrt'>Amount: {item.amount}</h5>
            <h6 className='rtrt'>Date: {item.date}</h6>
            <h6 className='rtrt'>Payment ID: {item._id}</h6>
            <h6 className='rtrt'>Status: {item.status}</h6>
            </div>
            <div>
            <button className='invoicebtn' onClick={() => DownloadPDF(item)}>Download Invoice <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg></button>
            </div>
        </div>
       
        </div>
    ))}
    </div>
  )
}

export default PaymentHistory