/*
  File: TransactionTable.js
  Author: [Your Name]
  Date: [Date]

  Description:
  This file defines the TransactionTable component, rendering a table of transaction data.
  The component uses the 'Transaction.scss' stylesheet for styling.

  Components:
  - TransactionTable: Functional component rendering a table of transaction data.
*/

import React from 'react';
import './Transaction.scss'; 

const TransactionTable = () => {
  // Dummy data for demonstration
  const transactions = [
    { id: 1, product: 'Medicine', customer: 'John Doe', dueDate: '2024-02-03', amount: 100, paymentMethod: 'Credit Card', status: 'Paid' },
    { id: 2, product: 'Consultation', customer: 'Jane Smith', dueDate: '2024-02-04', amount: 50, paymentMethod: 'Cash', status: 'Pending' },
    { id: 3, product: 'X-ray', customer: 'Mike Johnson', dueDate: '2024-02-05', amount: 75, paymentMethod: 'Insurance', status: 'Paid' },
    { id: 4, product: 'Lab Test', customer: 'Emily Brown', dueDate: '2024-02-06', amount: 120, paymentMethod: 'Credit Card', status: 'Pending' },
    { id: 5, product: 'Surgery', customer: 'David Wilson', dueDate: '2024-02-07', amount: 500, paymentMethod: 'Bank Transfer', status: 'Paid' },
  ];

  return (
    <div className="transaction-container"> 
      <h2>Latest Transactions</h2>
      <table className="transaction-table"> 
        <thead>
          <tr className='odd-row'>
            <th>TransactionID</th>
            <th>Product</th>
            <th>Customer</th>
            <th>Due Date</th>
            <th>Amount</th>
            <th>Payment Method</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={transaction.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
              {/* Apply a class based on the index to alternate row colors */}
              <td>{transaction.id}</td>
              <td>{transaction.product}</td>
              <td>{transaction.customer}</td>
              <td>{transaction.dueDate}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.paymentMethod}</td>
              <td>{transaction.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
