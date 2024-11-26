import React, { useState } from "react";
import DynamicTable from "./DynamicTable"; // Import the DynamicTable component
import "../css/DynamicTableNavigator.css"; // Custom styles

const DynamicTableNavigator = ({ userRole }) => {
  const [currentTable, setCurrentTable] = useState("auto"); // Default table

  return (
    <div className="table-navigator">
      <div className="button-container">
        {/* Buttons for switching tables */}
        <button onClick={() => setCurrentTable("auto")}>Auto</button>
        <button onClick={() => setCurrentTable("auto_personal")}>Auto personal</button>
        <button onClick={() => setCurrentTable("journal")}>Journal</button>
        <button onClick={() => setCurrentTable("routes")}>Routes</button>
      </div>
      <div className="table-display">
        {/* Dynamic table display */}
        <DynamicTable endpoint={currentTable} userRole={userRole} />
      </div>
    </div>
  );
};

export default DynamicTableNavigator;

