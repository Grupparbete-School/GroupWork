import useFetchProjects from "./UseAxiosProjects"
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import firstImg from '../components/F_img/Systembuilders1.jpg';

const FetchProject = () => {
  const {
    data,
    loading,
    error,
  } = useFetchProjects();

return (
  <div>
  {error && <div>error.message</div> }
  {loading && <div>Loading</div>}
  {!loading && (
    <div className="">
      {data.map && data.map(item => (
       
          <div>
          <div>

          <section className="card-container">

            <div className="col">
                
                    <div className="card">
                        <img src={firstImg} className="card-img-top" alt="Welding" />
                        <div className="card-body">
                            <h5>
                              <div key={item.ProjectName}>
                              <strong>{item.ProjectName}</strong>
                              </div></h5>
                            <p>Hours left: {item.HoursLeft}
                              Budgeted time: {item.MaxHours}</p>
                            <br/>
                        </div>
                        </div>

            </div>

          </section>
          </div>
          </div>

    //     <div key={item.ProjectName} className="w-full px-4 pt-4">
    //   <div className="mx-auto w-full max-w-md rounded-2xl bg-white">
    //     <Disclosure>
    //       {({ open }) => (
    //         <>
    //           <Disclosure.Button className="flex w-full justify-between rounded-lg bg-amber-200 px-2 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
    //             <span>{item.ProjectName}</span>
    //             <ChevronUpIcon
    //               className={`${
    //                 open ? 'rotate-180 transform' : ''
    //               } h-5 w-5 text-purple-500`}
    //             />
    //           </Disclosure.Button>
    //           <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">        
    //              <div>Hours left: {item.HoursLeft}</div>
    //             <div>Budgeted time: {item.MaxHours}</div>
    //             <div className="">Status: <span className="">{item.Status}</span></div>
    //           </Disclosure.Panel>
    //         </>
    //       )}
    //     </Disclosure>
    //     {/* <Disclosure as="div" className="mt-2">
    //       {({ open }) => (
    //         <>
    //           <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
    //             <span>Do you offer technical support?</span>
    //             <ChevronUpIcon
    //               className={`${
    //                 open ? 'rotate-180 transform' : ''
    //               } h-5 w-5 text-purple-500`}
    //             />
    //           </Disclosure.Button>
    //           <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
    //             No.
    //           </Disclosure.Panel>
    //         </>
    //       )}
    //     </Disclosure> */}
    //   </div>
    // </div>      
      ))}
    </div>
  )}
  
  </div>
)
}
export default FetchProject;
