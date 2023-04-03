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
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="spinner-border" role="status"></div></div>
    );
  } else {
    return (
      <>
        <div className="page-prompt" role="alert">
        <h3>Ändra projekt-status</h3>
        <h6>Här kan man ändra statusen för projekten. <br/>
          Klicka på "Välj ett projekt" för att se mer info och ändra statusen.</h6>
        </div>
      
      <div className="flex items-center h-screen text-black" style={{height: "auto", padding: "50px 10px"}}>
        <div className="mx-auto text-center card-container2">
          <h1 className="text-center">Ändra status<br/><br/></h1>
          

          <select style={{marginBottom: "20px"}} onChange={(e) => setSelectedPageId(e.target.value)}>
            <option value="">Välj ett projekt</option>
            {projectOptions}
          </select>
          <br/>
          <br/>
          {selectedProject && (
            <div className="card w-full form-bg">

              <h2>{selectedProject.ProjectName}</h2>

              <p className="card-subtitle mb-2 text-muted">
                {selectedProject.Description}
              </p>

              <p>
                <strong>Status:{" "}</strong>
                <span style={{ color: selectedProject.StatusColor }}>
                  {selectedProject.Status}
                </span>               
              </p>

              <p>
                <strong>Tidsgräns:</strong> 
                <br/>
                {selectedProject.StartDate} -{" "}
                {selectedProject.EndDate}
               </p>

              <p>
                <strong>Arbetad tid: </strong>

                {selectedProject.UsedHours} h
              </p>

                <p>
                  <strong>Tid kvar:</strong>{" "}
                  <span style={{ color: selectedProject.HoursLeft < 0 ? "red" : "green" }}>
                    {selectedProject.HoursLeft} h
                  </span>
                </p>
                <hr/>

                <strong>
                  <StatusCheckboxes
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                  />
                </strong>

              <div>
                <br/>
                <hr/>
                <button onClick={handleSubmit} className="default-btn">
                  Skicka
                </button>


              </div>
            </div>
          )}
        </div>
        {console.log(selectedPageId)}
        {console.log(selectedStatus)}
      </div>
      </>
    );
  }
}
