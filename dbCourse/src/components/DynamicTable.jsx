import React, { useState, useEffect } from "react";
import "../css/displayTable.css";

function DynamicTable({ endpoint }) {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3001/${endpoint}`);
        const result = await response.json();
        if (result.length > 0) {
          setColumns(Object.keys(result[0])); // Extract column names from the first row
          setData(result);  // Set the data only if it's non-empty
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
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col) => (
                <td key={col}>{row[col] || 'NULL'}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DynamicTable;
