import React, { useState, useEffect } from "react";
import axios from "axios";
import StatusCheckboxes from "./StatusDropDownList";
import Swal from "sweetalert2";

export default function ChangeStatus() {

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedPageId, setSelectedPageId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(null);

  const projectUrl = "http://localhost:5000/projects";

  useEffect(() => {
    fetch(projectUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          setLoading(true);
          setProjects(result);
        },
        (error) => {
          setLoading(true);
          setError(error);
        }
      );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedStatus) {
      Swal.fire("Välj en status!");
      return;
    }

    try {
      if (selectedPageId !== "") {
        axios.patch("http://localhost:5000/ChangeStatus", {
          status: selectedStatus,
          pageId: selectedPageId,
        });

        // Update the project status in the projects state
        setProjects(
          projects.map((project) => {
            if (project.PageId === selectedPageId) {
              return { ...project, Status: selectedStatus };
            } else {
              return project;
            }
          })
        );

        Swal.fire({
          title: "Projekt " + selectedProject.ProjectName,
          html: `Status ändrad till: <span class="status-text">${selectedStatus}</span>`,
          icon: "success",
          allowOutsideClick: true,
          allowEscapeKey: true,
          footer: "System builders AB",
          customClass: {
            popup: 'swal-popup'
          }
        });
        
        
      }
    } catch (error) {
      console.log(error);
      setError("Error: " + error.message);

      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        position: "center",
        allowOutsideClick: true,
        allowEscapeKey: true,
      });
    }
  };

  //Find right page id for project to know witch row to update in database
  const selectedProject = projects.find(
    (project) => project.PageId === selectedPageId
  );

  const projectOptions = projects.map((project) => (
    <option key={project.PageId} value={project.PageId}>
      {project.ProjectName} - {project.Status}
    </option>
  ));

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="flex items-center h-screen">
        <div className="mx-auto text-center">
          <h1 className="text-center">Ändra status</h1>

          <select onChange={(e) => setSelectedPageId(e.target.value)}>
            <option value="">Select a project</option>
            {projectOptions}
          </select>

          {selectedProject && (
            <div className="card w-full">
              <h2>{selectedProject.ProjectName}</h2>
              <p className="card-subtitle mb-2 text-muted">
                {selectedProject.Description}
              </p>
              <p>
                Status:{" "}
                <span style={{ color: selectedProject.StatusColor }}>
                  {selectedProject.Status}
                </span>
              </p>

              <p>
                Timespan: {selectedProject.StartDate} -{" "}
                {selectedProject.EndDate}
              </p>
              <p>Worked Hours: {selectedProject.UsedHours}</p>
              <p>Hours Left: {selectedProject.HoursLeft}</p>

              <StatusCheckboxes
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
              />

              <div>
              <button onClick={handleSubmit} className="mt-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
    Submit
</button>


              </div>
            </div>
          )}
        </div>
        {console.log(selectedPageId)}
        {console.log(selectedStatus)}
      </div>
    );
  }
}
