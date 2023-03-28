import {useState, useEffect, Fragment} from 'react'
import axios from 'axios';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'


export default function AddComment2(){

    const [error, setError] = useState('');
    const[loading, setLoading] = useState(false);
    const [peoples, setPeoples] = useState([]);
    const[projects, setProjects] = useState([]);
    const [timeReports, setTimeReports] = useState([]);

    const [comment, setComment] = useState("");
    const [commentName, setCommentName] = useState("");
    const [userData, setUserData] = useState([]);
    const [timeReportsIds, setTimeReportsIds] = useState([]);
    const [projectNames, setProjectNames] = useState([]);

    const peopleUrl = "http://localhost:5000/people";
    const projectUrl = "http://localhost:5000/projects";
    const timeReportsUrl = "http://localhost:5000/time";

    const [loggedInUser, setLoggedInUser] = useState("erixon.malin@hotmail.com");
    const [projIds, setProjIds] = useState([]);
    //dropdown list
    const [selectedTimeReport, setSelectedTimeReport] = useState("Select report")
      //fetch peopleDb
    useEffect(()=>{
        fetch(peopleUrl)
        .then(res => res.json())
        .then(
            (result)=>{
                setLoading(true)
                setPeoples(result)
            },
            (error) =>{
                setLoading(true)
                setError(error)
            }
        );
    },[]); 

//fetch timeReportsDb
useEffect(()=>{
    fetch(timeReportsUrl)
    .then(res => res.json())
    .then(
        (result)=>{
            setLoading(true)
            setTimeReports(result)
        },
        (error) =>{
            setLoading(true)
            setError(error)
        }
    );
},[]);
      //fetch projectsDB
    useEffect(()=>{
        fetch(projectUrl)
        .then(res => res.json())
        .then(
            (result)=>{
                setLoading(true)
                setProjects(result)
            },
            (error) =>{
                setLoading(true)
                setError(error)
            }
        );
    },[]);

   //filter peopleData to get logged in users info/relation time report ID that is the row in Time reprot DB
  useEffect(() => {
    if (peoples.length > 0) {
  
      const filteredPeoples = peoples
      .filter((item) => item.Email === loggedInUser);
      setUserData(filteredPeoples);
      //map to only get time reports ids from logged in user and store in new array
      const newTimeReportsIds = filteredPeoples.flatMap((item) => item.TimeReportsId.map((subItem) => subItem.id));
      setTimeReportsIds(newTimeReportsIds);
    }
  }, [peoples, loggedInUser, timeReports]);

  useEffect(()=>{
    // const matchingProjectNames = projects
    // .filter(project => project.TimeReportsId.some(report => timeReportsIds.includes(report.id)))
    // .map(project => project.ProjectName)

    // setProjectNames(matchingProjectNames);

    const projectData = projects.map(project => ({
      projectName: project.ProjectName,
      timeReportID: project.TimeReportsId.map(tr => tr.id)
    }));
    
    setProjectNames(projectData)
  },[projects, timeReportsIds])
 
    console.log(projectNames)
    // console.log(timeReportsIds)
    //  {console.log(projectNames)}
      
    
//to clear comments(not 100%)
  const onClear = () => {
    setComment("");
    setCommentName("");

  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Clear comments after submit
    setComment("");
    setCommentName("");

    
    //Comment heading
     axios
        .patch("http://localhost:5000/PatchComment", {
          Comment: comment,
          pageId: selectedTimeReport,
        })
        .catch((error) => {
          console.log(error);
          setError('Error: ' + error.message);
        });
        //Description of comment
    
    axios.post('http://localhost:5000/AddComment', {
        Comment: commentName,
        pageId: selectedTimeReport,
    
    }).catch(error =>{
        console.log(error);
        setError('Error: ' + error.message);
    });
};

if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!loading) {
    return <div>Loading...</div>;
  } else {

    return (
      
//I listan ska detta synas
//Datum från timereport + project namn

<main>

<div>
 {projectNames.forEach(element => {
  console.log(element)
 })}
</div>



<div className="top-16 w-72">
      <Listbox value={selectedTimeReport} onChange={setSelectedTimeReport}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selectedTimeReport}</span>
            {/* log selected item in list */}
            {console.log(selectedTimeReport + " Selected ID from List")}
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon 
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {timeReportsIds?.map((item, index) => (
                
      
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  //value that post/patch get to find right row in database
                  value={item}
                  
                >
                  {({ selectedTimeReport }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selectedTimeReport ? 'font-medium' : 'font-normal'
                        }`}
                      >    
                     {/* Displays in list data */}
                    {item}
                    
                      </span>
                      {selectedTimeReport ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
                 
                //End inner map
                      ))}
                
              {/* End of map */}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>

    <form onSubmit={handleSubmit} className="mt-4">
          <h1>Name of comment</h1>
          <input
            className="bg-gray-200"
            type="text"
            placeholder="comment heading..."
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              // console.log(e.target.value)
            }}
          />
          <h1>Add Comment</h1>
          <input
            className="h-20 bg-gray-200 text-black"
            type="text"
            placeholder="comment description..."
            value={commentName}
            onChange={(d) => {
              setCommentName(d.target.value);
              // console.log(d.target.value)
            }}
          />
          <div>
            <button type="submit" className="bg-gray-200 rounded m-3 p-1">
              Submit comment
            </button>
            <button
              type="submit"
              onClick={onClear}
              className="bg-red-700 rounded mt-3 p-1"
            >
              Delete comment
            </button>
          </div>
        </form>

    </main>
        )
    };
  };
    
