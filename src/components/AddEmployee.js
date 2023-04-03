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
    <div className="flex justify-center items-center h-screen">
      <form className="w-96">
        <h1>Nyanställd</h1>
        <label className="block mb-2 font-bold text-gray-700" htmlFor="name">
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

        <label className="block mb-2 font-bold text-gray-700" htmlFor="email">
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

        <label className="block mb-2 font-bold text-gray-700" htmlFor="role">
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
          <option value="project Manager">Projektledare</option>
        </select>
        
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 mr-2 font-bold text-white bg-indigo-500 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={handleSubmit}
          >
            Spara
          </button>
          <button
            className="px-4 py-2 font-bold text-white bg-gray-500 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleReset}
          >
            Återställ
          </button>
        </div>
      </form>
    </div>
  );
}}
