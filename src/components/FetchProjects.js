import useFetchProjects from "./UseAxiosProjects"
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import Sthlm from '../components/F_img/sthlm.jpg';
import London from '../components/F_img/London.jpg';
import EiffelTower from '../components/F_img/EffielTower.jpg';
import Oslo from '../components/F_img/Oslo.jpg';

const FetchProject = () => {
  const {
    data,
    loading,
    error,
  } = useFetchProjects();
  const image = [Sthlm, EiffelTower, London, Oslo];

return (
  <div>
  {error && <div>error.message</div> }
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
                            <p>
                              Timmar kvar: {item.HoursLeft} <br/>
                              Budgeterad tid: {item.MaxHours}<br/>
                              Status: <strong>{item.Status}</strong>
                              </p>
                            <br/>

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
export default FetchProject;
