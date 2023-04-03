import React, { useEffect, useState } from "react";

const ProfileImage = () => {
  const projectsUrl = "http://localhost:5000/projects";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [projects, setProjects] = useState([]);
  const [projectImage, setProjectImage] = useState('')

  useEffect(() => {
    fetch(projectsUrl)
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
  
  useEffect(() => {
    // Set the projectImage state for each project
    const projectImages = projects.map((project) => project.ProjectImage.url);
    setProjectImage(projectImages);

  }, [projects]);


    return (
      <div>
        {projects.map((project, index) => {
         if(project.ProjectName === "Duved")
         return  <div key={index}>
         <h2>{project.ProjectName}</h2>
         <img
           src={project.ProjectImage.url}
           alt={`${project.ProjectName} Profile Image`}
         />
       </div>
})}
      </div>
    );
    
};

export default ProfileImage;
