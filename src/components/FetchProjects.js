import useFetchProjects from "../components/UseAxiosProjects";
import Sthlm from '../components/F_img/sthlm.jpg';
import London from '../components/F_img/London.jpg';
import Duved from '../components/F_img/duved.jpg';
import Oslo from '../components/F_img/Oslo.jpg';

const FetchProjects = () => {
  const {
    data,
    loading,
    error,
  } = useFetchProjects();
  const image = [Duved, Sthlm, London, Oslo];


  return (
    <div>
      <div className="page-prompt" role="alert">
      <h3>Alla projekt</h3>
        <h6>Här finns alla projekten med mer information.</h6>
      </div>
      {error && <div>error.message</div>}
      {loading && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="spinner-border" role="status"></div></div>}
      {!loading && (
        <div className="projectsCardContainer">
          {data.map && data.map((item, index) => (
                  <div className="projectsCol">
                    <div className="card">
                      <img src={image[index]} className="card-img-top" alt="Pictures of building projects" />
                      <div className="card-body">
                        <h5>
                          <div key={index}>
                            <strong>{item.ProjectName}</strong>
                          </div>
                        </h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          {item.StartDate} - {item.EndDate} <br />
                        </h6>
                        <strong>Status:</strong>{" "}
                        <span style={{ color: item.StatusColor }}>
                        <strong>{item.Status}</strong>
                        </span>
                        <hr />
                        <p>
                          <strong>Budgeterad tid: </strong>{item.MaxHours} h<br />
                          <strong>Arbetad tid: </strong>{item.UsedHours} h<br />
                          <strong>Tid kvar:</strong>{" "}
                          <span style={{ color: item.HoursLeft < 0 ? "red" : "green" }}>
                          <strong>{item.HoursLeft} h</strong>
                          </span>
                          <br />
                          <hr />
                          <strong>Beskrivning:</strong><br /> {item.Description} <br />
                        </p>
                      </div>
                      <div className="card-footer" style={{padding: "10px 0"}}>
                    <div className="text-center">
                      <a href="http://localhost:3000/report" className="btn btn-primary btn-sm" style={{ marginRight: '10px', background: "linear-gradient(90deg, #0e7490 20%, #164e63 70%)" }}>
                        Ändra Tid
                      </a>
                      <a href="http://localhost:3000/comment_ChangeStatus" className="btn btn-primary btn-sm" style={{ marginLeft: '10px', background: "linear-gradient(90deg, #0e7490 20%, #164e63 70%)" }}>
                        Ändra Status
                      </a>
                    </div>
                  </div>
                    </div>
                  </div>
          ))}
        </div>
      )}

    </div>
  )
}
export default FetchProjects;




































// import useFetchProjects from "./UseAxiosProjects"
// import { Disclosure } from '@headlessui/react'
// import { ChevronUpIcon } from '@heroicons/react/20/solid'
// import Sthlm from '../components/F_img/sthlm.jpg';
// import London from '../components/F_img/London.jpg';
// import Duved from '../components/F_img/duved.jpg';
// import Oslo from '../components/F_img/Oslo.jpg';

// const FetchProject = () => {
//   const {
//     data,
//     loading,
//     error,
//   } = useFetchProjects();
//   const image = [Duved, Sthlm, London, Oslo];

// return (
//   <div>
//   {error && <div>error.message</div> }
//   {loading && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//       <div className="spinner-border" role="status"></div></div>}
//   {!loading && (
//     <div className="card-container">
//       {data.map && data.map((item, index) => (

//           <section >

//               <div className="col">

//                 <div className="card">
//                   <img src={image[index]} className="card-img-top" alt="Pictures of building projects" />
//                   <div className="card-body">
//                     <h5>
//                     <div key={index}>
//                         <strong>{item.ProjectName}</strong>
//                       </div></h5>
//                       Status: <strong>{item.Status}</strong> 
//                       <hr />
//                     <p>
//                       Budgeterad tid: {item.MaxHours} h<br />
//                       Arbetad tid: {item.UsedHours} h<br/>
//                       Tid kvar:{" "}
//                       <span style={{ color: item.HoursLeft < 0 ? "red" : "black" }}>
//                         {item.HoursLeft} h
//                       </span> 
//                     </p>
//                     <br />

//                   </div>
//                 </div>

//               </div>

//           </section> 
//       ))}
//     </div>
//   )}
  
//   </div>
// )
// }
// export default FetchProject;
