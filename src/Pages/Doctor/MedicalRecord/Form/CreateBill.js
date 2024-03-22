import { useState } from "react";

import Table from "./BillComponent/Table";
import Modal from "./BillComponent/Modal";

function CreateBill() {
  const [modalOpen, setModalOpen] = useState(false);

  const [rows, setRows] = useState([
    { name: "Paracetamol", description: "A medicine for fever", price: "15.000 VND", status: "Pending" },
    { name: "Paracetamol", description: "A medicine for fever", price: "15.000 VND", status: "Paid" },
    { name: "Paracetamol", description: "A medicine for fever", price: "15.000 VND", status: "Pending" },
    { name: "Paracetamol", description: "A medicine for fever", price: "15.000 VND", status: "Pending" },
    { name: "Paracetamol", description: "A medicine for fever", price: "15.000 VND", status: "Pending" },
  ]);

  const [rowToEdit, setRowToEdit] = useState(null);

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;
            return newRow;
          })
        );
  };

  return (
    <div className="create-bill-container">
      <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />

      <button type="button" className="Mbutton" onClick={() => setModalOpen(true)}>
        Add
      </button>

      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
        />
      )}
    </div>
  );
}

export default CreateBill;
