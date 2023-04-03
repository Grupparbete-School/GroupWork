import {useState, useEffect, Fragment} from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import '../index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AddComment(){

    const [error, setError] = useState('');
    const[loading, setLoading] = useState(false);
    const [peoples, setPeoples] = useState([]);
    const[projects, setProjects] = useState([]);
    const [timeReports, setTimeReports] = useState([]);
    const [options, setOptions] = useState([]);
    const [submitComment, setSubmitComment] = useState(true);
    const [submitCommentName, setSubmitCommentName] = useState(true);
    const [comment, setComment] = useState("");
    const [commentName, setCommentName] = useState("");
    const [selectedReport, setSelectedReport] = useState('');

    const peopleUrl = "http://localhost:5000/people";
    const projectUrl = "http://localhost:5000/projects";
    const timeReportsUrl = "http://localhost:5000/time";

    const filteredPeople = peoples.filter((person) => person.Email === localStorage.getItem('userEmail'));
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

//to clear comments(not 100%)
  const onClear = () => {
    setComment("");
    setCommentName("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedReport) {
      Swal.fire("Please select a time report.");
      return;
    }
  
    if (submitComment && submitCommentName && comment.trim() === "" && commentName.trim() === "") {
      Swal.fire("Please enter comment heading and description.");
      return;
    }
  
    if (submitComment && comment.trim() === "") {
      Swal.fire('Please enter comment heading.')
      return;
    }
  
    if (submitCommentName && commentName.trim() === "") {
      Swal.fire('Please enter comment description.')
      return;
    }

    try {
      if (submitComment && submitCommentName) {
        // Send both comment and commentName
         axios.post("http://localhost:5000/AddComment", {
          Comment: commentName,
          pageId: selectedReport,
        });
    
         axios.patch("http://localhost:5000/PatchComment", {
          Comment: comment,
          pageId: selectedReport,
        });
    
        await Swal.fire({
          title: "Du har skrivit denna kommentar:",
          text: comment,
          text: commentName,
          icon: "success",
          position: "bottom-start",
          allowOutsideClick: true,
          allowEscapeKey: true,
        });        
    
      } else if (submitComment) {
        // Comment heading
         axios.patch("http://localhost:5000/PatchComment", {
          Comment: comment,
          pageId: selectedReport,
        });
    
        await Swal.fire({
          title: "Du har skickat:",
          text: comment,
          icon: "success",
          position: "bottom-start",
          allowOutsideClick: true,
          allowEscapeKey: true,
        });
    
      } else if (submitCommentName) {
        // Description of comment
         axios.post("http://localhost:5000/AddComment", {
          Comment: commentName,
          pageId: selectedReport,
        });
    
        await Swal.fire({
          title: "Detaljerad beskrivning:",
          text: commentName,
          icon: "success",
          position: "bottom-start",
          allowOutsideClick: true,
          allowEscapeKey: true,
        });
      }
      setComment("");
      setCommentName("");  
    } catch (error) {
      console.log(error);
      setError("Error: " + error.message);
    
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        position: "center",
        allowOutsideClick: true,
        allowEscapeKey: true,
      });
    }    
  };

useEffect(() => {

  const newOptions = [];
  filteredPeople.forEach((person) => {
    person.TimeReportsId.forEach((report) => {
      const timeReport = timeReports.find((time) => time.PageId === report);
      const project = projects.find((proj) => proj.PageId === timeReport?.Projectid);
      if (!timeReport || !project) return null;
      newOptions.push(
        <option
          key={report}
          value={timeReport.PageId} // use timereport id as value
          className="absolute inset-y-0 left-0 flex items-center pl-3 text-black"
        >
          {project.ProjectName} ({timeReport.StartDate})
        </option>
      );
    });
  });
  setOptions(newOptions);
}, [timeReports, projects, peoples]);

if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!loading) {

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="spinner-border" role="status"></div></div>
    );
  } else {

        return (
          <div>
            <div className="page-prompt" role="alert">
              <h3>Lägga till kommentar</h3>
              <h6>Med den här funktionen kan användaren lägg till kommentarer på tidsrapporter</h6>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <main className='bg-gray-50 rounded border border-2'>

<div className="top-16 m-2">
  <select
    className="w-full bg-white rounded-lg shadow-md py-2 px-3 text-black
    leading-tight focus:outline-none focus:shadow-outline active-dropdown"
    value={selectedReport}
    onChange={(e) => setSelectedReport(e.target.value)}
  >
    <option className="py-2 text-gray-400">Välj projekt</option>
    {options}
  </select>
</div>


<form
      onSubmit={handleSubmit}
      className="mt-4 flex flex-col justify-center items-center"
    >
      <h1 className="text-lg font-bold">Rubrik</h1>
      <input
        className="bg-white border-2 border-gray-500 px-4 py-2 rounded"
        type="text"
        placeholder="skriv rubrik här..."
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />

      <div>
        <label>
          <input
            type="checkbox"
            checked={submitComment}
            onChange={(e) => setSubmitComment(e.target.checked)}
          />
          Lägg till rubrik
        </label>
      </div>

      <h1 className="text-lg font-bold mt-4">Kommentar</h1>
      <textarea
        className="w-72 h-40 m-2 box-borders border-2 border-gray-500 bg-white text-black px-4 py-2 resize-none rounded"
        placeholder="skriv kommentar här..."
        value={commentName}
        onChange={(d) => {
          setCommentName(d.target.value);
        }}
      ></textarea>

      <div>
        <label>
          <input
            type="checkbox"
            checked={submitCommentName}
            onChange={(e) => setSubmitCommentName(e.target.checked)}
          />
          Lägg till kommentar
        </label>
      </div>
  <button
  type="submit"
  className="my-2 ont-roboto font-normal text-white text-sm bg-cyan-900 py-2 px-6 rounded-full shadow-lg hover:py-2 hover:bg-cyan-700 hover:text-black hover:border-none focus:outline-none"
>
  Spara kommentar
</button>
  
</form>
    </main>
    </div>
       </div>
        )
    };
  };
    
