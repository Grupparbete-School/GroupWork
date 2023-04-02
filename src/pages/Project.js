import useFetchProjects from "../components/UseAxiosProjects";
import Sthlm from '../components/F_img/sthlm.jpg';
import London from '../components/F_img/London.jpg';
import Duved from '../components/F_img/duved.jpg';
import Oslo from '../components/F_img/Oslo.jpg';

const Project = () => {
  const {
    data,
    loading,
    error,
  } = useFetchProjects();
  const image = [Duved, Sthlm, London, Oslo];

  return (
    <div>
      {error && <div>error.message</div>}
      {loading && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="spinner-border" role="status"></div></div>}
      {!loading && (
        <div className="card-container">
          {data.map && data.map((item, index) => (

            <div>
              <div>

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
                          <span style={{ color: item.HoursLeft < 0 ? "red" : "black" }}>
                            {item.HoursLeft} h
                          </span>
                          <br />
                          <hr />
                          Beskrivning: <br /> {item.Description} <br />
                        </p>
                        <br />
                        <hr/>

                        
                      </div>
                    </div>

                  </div>

                </section>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}
export default Project;



