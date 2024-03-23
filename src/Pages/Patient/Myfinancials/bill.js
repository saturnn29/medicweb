/*
  File: Bill.js

  Description:
  This file defines the Bill component, which displays details about a user's bills. It includes a table
  showing information such as bill number, hospital, date & time, and payment status. Each row in the table
  can be toggled to reveal additional details using the RowContent component. The bill data is provided through
  the 'data' array.

  Components:
  - Bill: Functional component managing the overall layout and state.
  - RowContent: Class component rendering additional details for each bill row.
*/

import React from 'react';
import "./bill.css";
import {useState} from 'react'
import withAuth from "../../withAuth.js";

function Bill() {
    const [selected, setSelected] = useState(null)

    const toggle = (i) => {
        if (selected === i) {
            return setSelected(null)
        }
        setSelected(i)
    }
    
    return (
        <div className='bill-page'>
            <h1 className='bill-h1'>Your Bills Detail</h1>
            <div>
                <table className='bill-table'>
                    <thead className='bill-thead'>
                        <tr>
                            <th className='bill-no-h'>.No</th>
                            <th className='bill-hospital-h'>Hospital</th>
                            <th className='bill-time-h'>Data & Time</th>
                            <th className='bill-status-h'>Status</th>
                        </tr>
                    </thead>
                </table>

                <table className='bill-table'>
                    <tbody>
                        {data.map((bill, i) => (
                            <React.Fragment key={i}>
                                <tr className='bill-tb-head' onClick={() => toggle(i)}>
                                    <th className='bill-no-h'>{bill.no}</th>
                                    <th className='bill-hospital-h'>{bill.hospital}</th>
                                    <th className='bill-time-h'>{bill.time}</th>
                                    <th className='bill-status-h'>{bill.status}</th>
                                    <th><span>{selected === i ? '-' : '+' }</span></th>
                                </tr>
                                <tr>
                                    <td colSpan='4'>
                                        <div className={ selected === i ? 'bill-content show' : 'bill-content'}>
                                            <RowContent/>
                                        </div>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

 
const data = [
  {
    no: 'MR001',
    hospital: 'City Hospital',
    time: '6/6/2024 2:30pm',
    status: 'Completed',
  },
  {
    no: 'MR002',
    hospital: 'Healthcare Clinic',
    time: '6/8/2024 10:00am',
    status: 'Scheduled',
  },
  {
    no: 'MR003',
    hospital: 'Community Medical Center',
    time: '6/10/2024 3:45pm',
    status: 'Cancelled',
  },
  {
    no: 'MR004',
    hospital: 'General Medical Center',
    time: '6/12/2024 1:15pm',
    status: 'Scheduled',
  },
  {
    no: 'MR005',
    hospital: 'Emergency Care Center',
    time: '6/15/2024 9:30am',
    status: 'Completed',
  },
  {
    no: 'MR006',
    hospital: 'Urgent Care Clinic',
    time: '6/18/2024 4:00pm',
    status: 'Scheduled',
  },
];


class RowContent extends React.Component {
    render() {  
        return (
            <div>
                <table className='bill-table'>
                    <thead className='bill-head'>
                        <tr>
                        <th>.No</th>
                        <th>Item</th>
                        <th>Unit</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total</th>
                        </tr>
                    </thead>

                    <tbody className='bill-body'>
                        <tr>
                        <td>1</td>
                        <td>chainsaw</td>
                        <td>vnd</td>
                        <td>2</td>
                        <td>5.000.000</td>
                        <td>10.000.000</td>
                        </tr>

                        <tr>
                        <td colspan="6">
                            <th>Total bill;10.000.000vnd</th>
                            <th>Tax 1%: 1</th>
                            <th>Total bill with tax:1.000.001vnd</th>

                        </td>
                        </tr>
                        <tr>
                        <td colspan="6">Total bill with tax in text</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default withAuth(Bill, 'patient');