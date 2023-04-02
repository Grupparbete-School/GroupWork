import useFetchProjects from "../components/UseAxiosProjects";
import Sthlm from '../components/F_img/sthlm.jpg';
import London from '../components/F_img/London.jpg';
import Duved from '../components/F_img/duved.jpg';
import Oslo from '../components/F_img/Oslo.jpg';

const AllProjects = () => {
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
        <h6>Här kan man se alla projekt som finns i företaget.</h6>
      </div>
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
                        Status: <strong>{item.Status}</strong>
                        <hr />
                        <p>
                          Budgeterad tid: {item.MaxHours} h<br />
                          Arbetad tid: {item.UsedHours} h<br />
                          Tid kvar:{" "}
                          <span style={{ color: item.HoursLeft < 0 ? "red" : "green" }}>
                            {item.HoursLeft} h
                          </span>
                        </p>                    
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
export default AllProjects;




































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
