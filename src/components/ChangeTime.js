import React, { useState, useEffect } from "react";
import axios from 'axios'

import "bootstrap/dist/css/bootstrap.min.css";

import Sthlm from '../components/F_img/sthlm.jpg';
import London from '../components/F_img/London.jpg';
import Duved from '../components/F_img/duved.jpg';
import Oslo from '../components/F_img/Oslo.jpg';



export default function ChangeTime() {
  const [projects, setProjects] = useState([]);
  const [pageId, setPageId] = useState("");
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [editingMaxHours, setEditingMaxHours] = useState("");
  const [showEditButton, setShowEditButton] = useState(true);
  const [showSaveButton, setShowSaveButton] = useState(false);

  const image = [Duved, Sthlm, London, Oslo];

  useEffect(() => {
    fetch("http://localhost:5000/projects")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setIsLoaded(true);
          setProjects(result);
          setPageId(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const handleSave = () => {
    setShowSaveButton(false);
    const id = pageId;
    const updatedProjects = projects.map((p) => {
      if (p.PageId === pageId) {
        axios
          .patch("http://localhost:5000/PatchChange", {
            Hours: editingMaxHours,
            PageIds: id
          })
          // .then(window.location.reload())
          .catch((error) => {
            console.log(error);
            setError('Error: ' + error.message);
          });
        return {
          ...p,
          MaxHours: editingMaxHours,
        };
      }
      return p;
    });

    setProjects(updatedProjects);
    setEditingProject(null);
    setShowEditButton(true);
    setShowSaveButton(false);

  };

  if (!isLoaded) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="spinner-border" role="status"></div></div>
    );
  } else {
    return (
      <div>
        <div className="page-prompt" role="alert">
        <h3>Uppdatera tid</h3>
        <h6>Här kan man ändra tiden för ett projekt genom att klicka på "Ändra timmar"</h6>
        </div>
      <div className="card-container">
              {projects.map((item, index) => {
                  return (

                      <section >

                          <div className="col">

                            <div className="card">
                              <img src={image[index]} className="card-img-top" alt="Pictures of building projects" />
                              <div className="card-body">
                                <h5>
                                  <div key={index}>
                                    <strong>{item.ProjectName}</strong>
                                  </div></h5>
                                <h6>
                                  {item.StartDate} -- {item.EndDate} <br />
                                </h6>
                                Status: <strong>{item.Status}</strong>
                                <hr />
                                <p>
                                  Budgeterad tid: {item.MaxHours} h<br />
                                  Arbetad tid: {item.UsedHours} h<br />
                                  Tid kvar:{" "}
                                  <span style={{ color: item.HoursLeft < 0 ? "red" : "green" }}>
                                    {item.HoursLeft} h
                                  </span>
                                  <br />
                                  <hr />
                                  Beskrivning: <br /> {item.Description} <br />
                                </p>
                                <hr/>
                               
                              </div>


                              {pageId && pageId === item.PageId && (
                                <div>
                                  {<input
                                    className="inputChangeTime"
                                    type="text"
                                    placeholder="Ändra timmar till..."
                                    value={editingMaxHours}
                                    onChange={(e) => setEditingMaxHours(e.target.value)}
                                  />}
                                  <br /><br />
                                  {showSaveButton && <button className="default-btn" onClick={handleSave}>
                                      Spara
                                    </button>}
                                </div>
                              )}
                              {pageId && (
                                showEditButton &&
                                <button
                                className="default-btn"
                                  onClick={() => {
                                    setPageId(item.PageId);
                                    setShowEditButton(false);
                                    setShowSaveButton(true);
                                  }}
                                >
                                  Ändra timmar
                                </button>
                              )} 

                        </div>
                        </div>
                        </section>
                  );
              })}
      </div>
      </div>
  );
}
}











// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import axios from 'axios'

// export default function ChangeTime() {
//     console.log('ChangeTime rendered');
//     const [projects, setProjects] = useState([]);
//     const [pageId, setPageId] = useState("");
//     const [error, setError] = useState(null);
//     const [isLoaded, setIsLoaded] = useState(false);
//     const [editingProject, setEditingProject] = useState(null);
//     const [editingMaxHours, setEditingMaxHours] = useState("");


//     useEffect(() => {
//         fetch("http://localhost:5000/projects")
//             .then((res) => res.json())
//             .then(
//                 (result) => {
//                     console.log(result);
//                     setIsLoaded(true);
//                     setProjects(result);
//                     setPageId(result);
//                 },
//                 (error) => {
//                     setIsLoaded(true);
//                     setError(error);
//                 }
//             );
//     }, []);

//     const handleSave = () => {
//         const id = pageId;
//         const updatedProjects = projects.map((p) => {
//             if (p.PageId === pageId) {
//                 axios
//                     .patch("http://localhost:5000/PatchChange", {
//                         Hours: editingMaxHours,
//                         PageIds: id
//                     })
//                     .catch((error) => {
//                         console.log(error);
//                         setError('Error: ' + error.message);
//                     });
//                 return {
//                     ...p,
//                     MaxHours: editingMaxHours,
//                 };
//             }
//             return p;
//         });
      
//         setProjects(updatedProjects);
//         setEditingProject(null);
//         console.log(updatedProjects)
//     };

//     if (!isLoaded) {
//         return <div>Loading ...</div>;
//     } else {
//         return (
//             <div>
//                 <div
//                     className="d-flex flex-wrap"
//                     style={{
//                         justifyContent: "center",
//                         alignItems: "center",
//                         marginTop: "1rem",
//                     }}
//                 >
//                     {projects.map((item, index) => {
//                         return (
//                             <div
//                                 className="card"
//                                 style={{
//                                     width: "18rem",
//                                     margin: "0.5rem",
//                                     padding: "0.5rem",
//                                 }}
//                                 key={index}
//                             >
//                                 <div className="card-body">
//                                     <h5 className="card-title">{item.ProjectName}</h5>
//                                     <h6 className="card-subtitle mb-2 text-muted">
//                                         {item.StartDate} - {item.EndDate}
//                                     </h6>
//                                     <p className="card-text">{item.Description}</p>
//                                     <p className="card-text">
//                                         Total timmar: {item.MaxHours}
//                                     </p>
//                                     <p className="card-text">
//                                         Antal timmar kvar: {item.HoursLeft}
//                                     </p>
                                    
//                                     {pageId && pageId === item.PageId && (
//                                         <div>
//                                             <input
//                                                 type="text"
//                                                 value={editingMaxHours}
//                                                 onChange={(e) => setEditingMaxHours(e.target.value)}
//                                             />
//                                             {console.log(editingMaxHours)}
//                                             <button onClick={handleSave}>Spara</button>
//                                         </div>
//                                     )}
//                                     {pageId && (
//                                         <button onClick={() => setPageId(item.PageId)}>Ändra timmar</button>
                                        
//                                     ) }
//                                 </div>
                                
//                             </div>
                            
//                         );
//                     })}
//                     {console.log(pageId)}
//                 </div>
//             </div>
//         );
//     }
// }