import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function FetchPeople2() {
  const [people, setPeople] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/people")
    .then(res => res.json())
    .then((result) => {
      const ppl = result.filter(
        usr => usr.Email.toLowerCase() === "ewahlstrom90@gmail.com");
      setPeople(ppl);
      console.log(ppl)
    },
      (error) => {
        setError(error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/projects")
    .then(res => res.json())
    .then((result) => {
      // setIsLoaded(true); 
      const active = result.filter(item => item.Status === "Active")
      setItems(active);
      console.log(active)
    },
      (error) => {
        // setIsLoaded(true); 
        setError(error);
      });
  }, []);

  useEffect(() => {
    if (people.length > 0 && items != undefined) {
      
      const matchedProjects = items.filter(project => {
        console.log(project)
        return project.peopleId.some(id => people[0].TimeReportsId.includes(id))
      })
      setIsLoaded(true)
      console.log(matchedProjects);
      setProjects(matchedProjects);
    }
  },
    [people, items]);
    
  if (!isLoaded) {
    return <div>Loading ...</div>;
  }
  else {
    return (
      <div>
        <div className="alert alert-primary" role="alert" style={{ textAlign: 'center' }}>
          {people[0]?.Name} aktiva projekt:
        </div>
        <div className="d-flex flex-wrap" style={{ justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}>
          {projects.map((item, index) => {
            return (
              <div className="card" style={{ width: '18rem', margin: '0.5rem', padding: '0.5rem' }} key={index}>
                <div className="card-body">
                  <h5 className="card-title">{item.ProjectName}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{item.StartDate} - {item.Status}</h6>
                  <p className="card-text">{item.Description}</p>
                  <p className="card-text">Antal timmar kvar: {item.HoursLeft}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

