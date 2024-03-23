import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from "./BillComponent/Table";
import Modal from "./BillComponent/Modal";

function CreateBill({ customerId }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/get-bills/${customerId}`)
      .then(response => {
        setBills(response.data);
      })
      .catch(error => {
        console.error('Error retrieving treatment plan:', error);
      });
  }, []);

  const handleDeleteRow = async (targetIndex) => {
    try {
      const billId = bills[targetIndex].bill_id;
      await axios.delete(`http://localhost:8080/delete-bill/${billId}`);
      setBills(bills.filter((_, idx) => idx !== targetIndex));
    } catch (error) {
      console.error('Error deleting bill:', error);
    }
  };

  const handleSubmit = (newRow) => {
    const userId = sessionStorage.getItem('userId');
    axios.post('http://localhost:8080/submit-bill', {
      customerId: customerId,
      userId: userId,
      billDate: newRow.bill_date,
      totalCost: newRow.total_cost,
      billDesc: newRow.bill_desc,
      paymentConfirmation: newRow.payment_confirmation,
    })
      .catch(error => {
        console.error('Error retrieving medical summary:', error);
      });

    setBills([...bills, newRow]);
  };

  const billRows = bills.map((bill, index) => ({
    date: bill.bill_date,
    description: bill.bill_desc,
    price: bill.total_cost,
    status: bill.payment_confirmation ? 'Paid' : 'Pending',
    index,
  }));

  return (
    <div className="create-bill-container">
      <Table rows={billRows} deleteRow={handleDeleteRow} />
      <button type="button" className="Mbutton" onClick={() => setModalOpen(true)}>
        Add
      </button>
      {modalOpen && (
        <Modal
          closeModal={() => setModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default CreateBill;