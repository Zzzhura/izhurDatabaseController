
import React, { useState, useEffect } from "react";
import "../css/displayTable.css";

function DynamicTable({ endpoint, userRole }) {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newRow, setNewRow] = useState({}); // State to manage new row data

  console.log("User Role:", userRole); // Debugging to check userRole value

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3001/${endpoint}`);
        const result = await response.json();
        if (result.length > 0) {
          setColumns(Object.keys(result[0])); // Extract column names from the first row
          setData(result); // Set the data only if it's non-empty
        } else {
          setData([]); // Set data as empty if response is empty
        }
      } catch (err) {
        setError("Error fetching data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]); // Dependency on endpoint to re-fetch when it changes

  // Add a new row (only for admin users)
  const handleAddRow = async () => {
    if (userRole === "admin") {
      const newData = { ...newRow };
      setData([...data, newData]);

      // Optionally, send the new row to the backend
      try {
        await fetch(`http://localhost:3001/${endpoint}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newData),
        });
        setNewRow({}); // Reset new row form
      } catch (err) {
        console.error("Error adding row:", err);
      }
    } else {
      alert("You do not have permission to add rows.");
    }
  };

  // Delete a row (only for admin users)
  const handleDeleteRow = async (id) => {
    if (userRole === "admin") {
      const updatedData = data.filter((row) => row.id !== id);
      setData(updatedData);

      try {
        await fetch(`http://localhost:3001/${endpoint}/${id}`, {
          method: "DELETE",
        });
      } catch (err) {
        console.error("Error deleting row:", err);
      }
    } else {
      alert("You do not have permission to delete rows.");
    }
  };

  // Update a row (only for admin users)
  const handleModifyRow = async (id) => {
    if (userRole === "admin") {
      const modifiedRow = prompt("Enter new data for row (comma-separated):");
      const updatedRow = modifiedRow.split(","); // This is a basic way to handle it

      const updatedData = data.map((row) =>
        row.id === id ? { ...row, name: updatedRow[0] } : row
      );
      setData(updatedData);

      try {
        await fetch(`http://localhost:3001/${endpoint}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, name: updatedRow[0] }), // Modify according to your column structure
        });
      } catch (err) {
        console.error("Error updating row:", err);
      }
    } else {
      alert("You do not have permission to modify rows.");
    }
  };

  // Handling loading, error and empty data conditions
  if (loading) {
    return <p>Loading data...</p>; // Show loading state
  }

  if (error) {
    return <p className="error-message">{error}</p>; // Display error message
  }

  if (data.length === 0) {
    return <p>No data available for {endpoint}</p>; // Display message if no data
  }

  return (
    <div className="table-container">
      <h2>Data from {endpoint}</h2>
      <table className="dynamic-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
            {userRole === "admin" && <th>Actions</th>} {/* Only show actions for admin */}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col) => (
                <td key={col}>{row[col] || 'NULL'}</td>
              ))}
              {userRole === "admin" && (
                <td>
                  <button onClick={() => handleModifyRow(row.id)}>Edit</button>
                  <button onClick={() => handleDeleteRow(row.id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {userRole === "admin" && (
        <div className="add-row-container">
          <button onClick={handleAddRow}>Add Row</button>
        </div>
      )}
    </div>
  );
}

export default DynamicTable;
