import React from "react";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import "./Table.css";

function Table({ rows, deleteRow, editRow }) {
  return (
    <div className="table-CBill-wrapper"> 
      <table className="table-CBill">
        <thead>
          <tr>
            <th>Date</th>
            <th className="expand">Description</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const statusText =
              row.status.charAt(0).toUpperCase() + row.status.slice(1);
            return (
              <tr key={idx}>
                <td>{row.date}</td>
                <td className="expand">{row.description}</td>
                <td>{row.price}</td>
                <td>
                  <span className={`labelT label-${row.status}`}>
                    {statusText}
                  </span>
                </td>
                <td className="fit">
                  <span className="action-button">
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => deleteRow(idx)}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
