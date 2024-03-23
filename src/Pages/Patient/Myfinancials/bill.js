import React, { useState, useEffect } from 'react';
import "./bill.css";
import withAuth from "../../withAuth.js";
import axios from 'axios';

function Bill() {
    const [selected, setSelected] = useState(null);
    const [bills, setBills] = useState([]);

    const toggle = (i) => {
        if (selected === i) {
            return setSelected(null)
        }
        setSelected(i)
    }

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
    
        axios.get(`http://localhost:8080/billdetail/${userId}`)
          .then(response => {
            setBills(response.data);
          })
          .catch(error => {
            console.error('Error retrieving bill details:', error);
          });
      }, []);
    
    return (
        <div className='bill-page'>
            <h1 className='bill-h1'>Your Bills Detail</h1>
            <div>
                <table className='bill-table'>
                    <thead className='bill-thead'>
                        <tr>
                            <th className='bill-no-h'>.No</th>
                            <th className='bill-name-h'>Doctor's Name</th>
                            <th className='bill-patient-h'>Patient's Name</th>
                            <th className='bill-date-h'>Bill Date</th>
                            <th>/</th>
                        </tr>
                    </thead>
                    {bills.map((bill, i) => (
                        <tbody key={i}>
                            <tr className='bill-tb-head' onClick={() => toggle(i)}>
                                <th className='bill-no-h'>{i + 1}</th>
                                <th className='bill-name-h'>{bill.Doctors_name}</th>
                                <th className='bill-patient-h'>{bill.Patients_name}</th>
                                <th className='bill-date-h'>{bill.bill_date}</th>
                                <th><span>{selected === i ? '-' : '+'}</span></th>
                            </tr>
                            <tr>
                                <td colSpan='5'>
                                    <div className={selected === i ? 'bill-content show' : 'bill-content'}>
                                        <RowContent rowData={bill} />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
    );
}

function RowContent({ rowData }) {
    return (
        <div>
            <table className='bill-table'>
                <tbody className='bill-body'>
                    <tr>
                        <td style={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }} colSpan='2' className='bill-border'>
                            Bill Description
                        </td>
                    </tr>
                    <tr>
                        <td colSpan='2' className='bill-border'>
                            {rowData.bill_desc}
                        </td>
                    </tr>
                    <tr>
                        <td style={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }} colSpan='2' className='bill-border'>
                            Total Cost
                        </td>
                    </tr>
                    <tr>
                        <td colSpan='2' className='bill-border'>
                            {rowData.total_cost}
                        </td>
                    </tr>
                    <tr>
                        <th style={{ backgroundColor: '#f0f0f0' }} colSpan='2' className='bill-border'>
                            Payment Confirmation
                        </th>
                    </tr>
                    <tr>
                        <td colSpan='2' className='bill-border'>
                            {rowData.payment_confirmation}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default withAuth(Bill, 'patient');