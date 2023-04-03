import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

export default function AddEmployee() {

  const [error, setError] = useState("");
  const [loading, setLoading]  = useState(false);
  const [peoples, setPeoples] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const peopleUrl = "http://localhost:5000/people";

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

  const handleSubmit = async (event) => {

    event.preventDefault();

    // check if required input fields are empty
    if (!selectedName || !selectedEmail || !selectedRole) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Alla fält behöver fyllas i.",
      });
      return;
    }

    try {
      axios.post("http://localhost:5000/AddEmployee", {
        Name: selectedName,
        Role: selectedRole,
        Email: selectedEmail,
        image: selectedImage,
      });

      // show success message
      Swal.fire({
        icon: "success",
        iconColor: "red",
        title: `Välkommen till oss på System builders AB.`,
        text: `${selectedName}, du kommer passa som handen i handsken som ${selectedRole}. Din angivna mail ${selectedEmail} kommer du få många härliga brev till.`,
        footer: "System Builders AB",
      });
      

      // reset form inputs
      handleReset();

    } catch (error) {
      console.log(error);
      setError("Error: " + error.message);
    }
  };
  console.log(selectedName)
  console.log(selectedEmail)
  console.log(selectedRole)
  console.log(selectedImage)
  //reset form inputs
  const handleReset = () => {
    setSelectedName("");
    setSelectedRole("");
    setSelectedEmail("");
    setSelectedImage("");
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!loading) {

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="spinner-border" role="status"></div></div>
    );
  } else {
  
  return (
    <>
      <div className="page-prompt" role="alert">
          <h3>Lägga till personal</h3>
          <h6>Här kan man lägga till användare i systemet. <br/>
              Fyll i uppgifterna och spara ner.</h6>
      </div>

      <div className="flex justify-center items-center h-screen" style={{height: "auto", padding: "50px 10px"}}>
        <form className="mx-auto text-center card-container2">
          <h1 className="text-center">Nyanställd<br/><br/></h1>
          <label className="block mb-2 p-2.5 font-bold text-black" htmlFor="name">
            Namn:
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="name"
            value={selectedName}
            placeholder="skriv ditt namn"
            onChange={(event) => setSelectedName(event.target.value)}
          />

          <label className="block mb-2 p-2.5 font-bold text-black" htmlFor="email">
            Email:
          </label>
          <input
            className="w-full px-3 py-2 border rounded-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            id="email"
            value={selectedEmail}
            placeholder="skriv din email, t.ex. namn@example.com..."
            onChange={(event) => setSelectedEmail(event.target.value)}
          />

          <label className="block mb-2 p-2.5 font-bold text-black" htmlFor="role">
            Roll:
          </label>
          <select
            className="w-full px-3 py-2 border rounded-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="role"
            value={selectedRole}
            onChange={(event) => setSelectedRole(event.target.value)}
          >
            <option value="">Välj roll</option>
            <option value="user">Användare</option>
            <option value="owner">Ägare</option>
            <option value="project manager">Projektledare</option>
          </select><br/><br/>
          
          <div className="card-footer" style={{padding: "10px 0"}}>
            <div className="default-btn">
              <button
                type="submit"
                onClick={handleSubmit}
              >
                Spara
              </button>
            </div><br/>

            <div className="default-btn">
              <button
                type="button"
                onClick={handleReset}
              >
                Återställ
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}}
