import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'

export default function ChangeTime() {
    console.log('ChangeTime rendered');
    const [projects, setProjects] = useState([]);
    const [pageId, setPageId] = useState("");
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [editingMaxHours, setEditingMaxHours] = useState("");


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
        const id = pageId;
        const updatedProjects = projects.map((p) => {
            if (p.PageId === pageId) {
                axios
                    .patch("http://localhost:5000/PatchChange", {
                        Hours: editingMaxHours,
                        PageIds: id
                    })
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
        console.log(updatedProjects)
    };

    if (!isLoaded) {
        return <div>Loading ...</div>;
    } else {
        return (
            <div>
                <div
                    className="d-flex flex-wrap"
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "1rem",
                    }}
                >
                    {projects.map((item, index) => {
                        return (
                            <div
                                className="card"
                                style={{
                                    width: "18rem",
                                    margin: "0.5rem",
                                    padding: "0.5rem",
                                }}
                                key={index}
                            >
                                <div className="card-body">
                                    <h5 className="card-title">{item.ProjectName}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">
                                        {item.StartDate} - {item.EndDate}
                                    </h6>
                                    <p className="card-text">{item.Description}</p>
                                    <p className="card-text">
                                        Total timmar: {item.MaxHours}
                                    </p>
                                    <p className="card-text">
                                        Antal timmar kvar: {item.HoursLeft}
                                    </p>
                                    
                                    {pageId && pageId === item.PageId && (
                                        <div>
                                            <input
                                                type="text"
                                                value={editingMaxHours}
                                                onChange={(e) => setEditingMaxHours(e.target.value)}
                                            />
                                            {console.log(editingMaxHours)}
                                            <button onClick={handleSave}>Spara</button>
                                        </div>
                                    )}
                                    {pageId && (
                                        <button onClick={() => setPageId(item.PageId)}>Ändra timmar</button>
                                        
                                    ) }
                                </div>
                                
                            </div>
                            
                        );
                    })}
                    {console.log(pageId)}
                </div>
            </div>
        );
    }
}