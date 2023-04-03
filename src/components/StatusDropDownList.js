import React from "react";

export default function StatusDropdown({ selectedStatus, setSelectedStatus }) {

  const statusOptions = [
    { label: "Färdigt", value: "Färdigt" },
    { label: "Kommande", value: "Kommande" },
    { label: "Paus", value: "Paus" },
    { label: "Aktivt", value: "Aktivt" },
    { label: "Inaktivt", value: "Inaktivt" }
  ];

  const handleSelectChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  return (
    <div>
      <label htmlFor="status">Status:</label>
      <select id="status" value={selectedStatus} onChange={handleSelectChange}>
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}
