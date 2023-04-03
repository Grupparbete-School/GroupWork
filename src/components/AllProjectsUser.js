import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sthlm from '../components/F_img/sthlm.jpg';
import London from '../components/F_img/London.jpg';
import EiffelTower from '../components/F_img/EffielTower.jpg';
import Oslo from '../components/F_img/Oslo.jpg';

export default function FetchPeople2() {
  const [people, setPeople] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [projects, setProjects] = useState([]);
  const image = [Oslo, London, Sthlm, EiffelTower];

  useEffect(() => {
    fetch("http://localhost:5000/people")
      .then(res => res.json())
      .then((result) => {
        const ppl = result.filter(
          usr => usr.Email.toLowerCase() === localStorage.getItem("userEmail"));
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
        const active = result.filter(item => item.Status === "Aktivt" || item.Status === "Kommande");
        setItems(active);
        console.log(active)
      },
        (error) => {
          setError(error);
        });
  }, []);

  useEffect(() => {
    if (people.length > 0 && items != undefined) {

      const matchedProjects = items.filter(project => {
        console.log(project)
        return project.PersonId.some(id => people[0].TimeReportsId.includes(id))
      })
      setIsLoaded(true)
      console.log(matchedProjects);
      setProjects(matchedProjects);
    }
  },
    [people, items]);

  if (!isLoaded) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="spinner-border" role="status"></div></div>
    );
  }
  else {
    return (
      <div>
        <div className="page-prompt" role="alert">
          <div>
          <p>
            <h3><strong>{people[0]?.Name}</strong>
          </h3>
          Här kan du både tidsrapportera och kommentera på varje projekt
          <br/>
          <br/>
            <h5>Du har följande aktiva projekt:</h5>
          </p>

          </div>
        </div>

        <div className="card-container">
          <div className="d-flex flex-wrap" style={{ justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}>
            {projects.map((item, index) => {
              return (
                <div className="card" style={{ width: '17rem', margin: '0.5rem', padding: '0.5rem' }} key={index}>
                  <img src={item.ProjectImage.url} className="card-img-top" alt="Pictures of building projects" style={{ height: "auto" }} />
                  <div className="card-header">
                    <h5 className="card-title">{item.ProjectName}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{item.StartDate} - {item.EndDate}</h6>
                    <span style={{color: item.StatusColor}}><strong>{item.Status}</strong></span>
                  </div>
                  <div className="card-body">
                    <p className="card-text">
                      <strong>Beskrivning:</strong><br/>
                      <span>{item.Description}</span>
                    </p>
                    <p className="card-text">
                      <strong>Total arbetstimmar:</strong><br/>
                      <span style={{color: item.HoursLeft <= 0 ? 'red' : 'green'}}>
                        <strong>{item.HoursLeft}</strong>
                      </span>
                    </p>
                    <p className="card-text">
                      <strong>Projektets tidsbudget:</strong><br/>
                      <span>{item.MaxHours} timmar</span>
                    </p>
                  </div>
                  <div className="card-footer" style={{padding: "10px 0"}}>
                    <div className="text-center">
                      <a href="http://localhost:3000/report" className="btn btn-primary btn-sm" style={{ marginRight: '10px', background: "linear-gradient(90deg, #0e7490 20%, #164e63 70%)" }}>
                        Tidsrapportera
                      </a>
                      <a href="http://localhost:3000/comment_ChangeStatus" className="btn btn-primary btn-sm" style={{ marginLeft: '10px', background: "linear-gradient(90deg, #0e7490 20%, #164e63 70%)" }}>
                        Kommentera
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

