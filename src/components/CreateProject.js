import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

export default function CreateProject() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedProjectName, setSelectedProjectName] = useState("");
  const [selectedMaxHours, setSelectedMaxHours] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [StatusColor, setStatusColor] = useState("");

  const projectUrl = "http://localhost:5000/projects";

  useEffect(() => {
    fetch(projectUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          setLoading(true);
          setProjects(result);
          setStatusColor(result.StatusColor);
        },
        (error) => {
          setLoading(true);
          setError(error);
        }
      );
  }, []);

  const getStatusColor = (selectedStatus) => {
    const project = projects.find(
      (project) => project.Status === selectedStatus
    );
    return project ? project.StatusColor : "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // check if required input fields are empty
    if (
      !selectedProjectName ||
      !selectedMaxHours ||
      !selectedStartDate ||
      !selectedEndDate ||
      !selectedStatus ||
      !selectedDescription
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all required fields",
      });
      return;
    }

    // check if end date is before start date
    if (new Date(selectedEndDate) < new Date(selectedStartDate)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "End date must be after start date",
      });
      return;
    }

    try {
      axios.post("http://localhost:5000/CreateProject", {
        ProjectName: selectedProjectName,
        MaxHours: selectedMaxHours,
        StartDate: selectedStartDate,
        EndDate: selectedEndDate,
        Status: selectedStatus,
        Description: selectedDescription,
      });

      const statusColor = getStatusColor(selectedStatus);
      // show success message
      // show success message
      Swal.fire({
        icon: "success",
        iconColor: "red",
        title: "Nytt projekt tillagt",
        text: `Project '${selectedProjectName}'.\nStart date: ${selectedStartDate}.\nEnd date: ${selectedEndDate}.\nBudgeterad tid: ${selectedMaxHours}.\nBeskrivning: ${selectedDescription}.\n`,         
        footer: statusColor
          ? `Projekt status: <span style="color:${statusColor}"> ${selectedStatus}</span>`
          : "",
      });

      // reset form inputs
      handleReset();
    } catch (error) {
      console.log(error);
      setError("Error: " + error.message);
    }
  };

  //reset form inputs
  const handleReset = () => {
    setSelectedProjectName("");
    setSelectedMaxHours("");
    setSelectedStartDate("");
    setSelectedEndDate("");
    setSelectedStatus("");
    setSelectedDescription("");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-90">
        <h1 className="mb-5 text-center">Lägga till nytt projekt</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              className="block mb-2 font-bold text-gray-700"
              htmlFor="projectName"
            >
              Projekt namn:
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="projectName"
              value={selectedProjectName}
              onChange={(event) => setSelectedProjectName(event.target.value)}
            />
            <label
              className="block mb-2 font-bold text-gray-700"
              htmlFor="maxHours"
            >
              Budgeterad tid:
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="maxHours"
              value={selectedMaxHours}
              onChange={(event) => setSelectedMaxHours(event.target.value)}
            />
          </div>
          <div>
            <label
              className="block mb-2 font-bold text-gray-700"
              htmlFor="startDate"
            >
              Start datum:
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="date"
              id="startDate"
              value={selectedStartDate}
              onChange={(event) => setSelectedStartDate(event.target.value)}
            />
            <label
              className="block mb-2 font-bold text-gray-700"
              htmlFor="endDate"
            >
              Slut datum:
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="date"
              id="endDate"
              value={selectedEndDate}
              onChange={(event) => setSelectedEndDate(event.target.value)}
            />
          </div>
          <div className="col-span-2">
            <label
              className="block mb-2 font-bold text-gray-700"
              htmlFor="status"
            >
              Status:
            </label>
            <select
              className="w-full px-3 py-2 border rounded-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="status"
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
            >
              <option value="">Välj status</option>
              <option value="Aktivt">Aktivt</option>
              <option value="Inaktivt">Inaktivt</option>
              <option value="Kommande">Kommande</option>
              <option value="Färdigt">Färdigt</option>
            </select>
          </div>
          <div className="col-span-2">
            <label
              className="block mb-2 font-bold text-gray-700"
              htmlFor="description"
            >
              Beskrivning:
            </label>
            <textarea
              className="w-full h-40 px-3 py-2 border rounded-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              value={selectedDescription}
              onChange={(event) => setSelectedDescription(event.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className="px-4 py-2 mr-2 font-bold text-white bg-indigo-500 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={handleSubmit}
          >
            Spara
          </button>
          <button
            className="px-4 py-2 font-bold text-white bg-gray-500 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleReset}
          >
            Återställ
          </button>
        </div>
      </form>
    </div>
  );
}
