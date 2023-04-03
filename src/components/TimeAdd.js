import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import ProjectDTO from './ProjectDTO';
import axios from 'axios';  
import '../index.css'; 
import Swal from 'sweetalert2';

export default function TimeForm() {
    const [activeItems, setActiveItems] = useState([ProjectDTO("0")]);
    const [selectedItem, setSelectedItem] = useState(activeItems[0]);
    const [personId, setPersonId] = useState("");
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [date, setDate] = useState();
    const [hours, setHours] = useState();

    const handleChange = (e) => { 
        setSelectedItem(e.target.value);
    }

    useEffect(() => {
        fetch("http://localhost:5000/projects")
        .then(res => res.json())
        .then(
            (result)=>{ 
                let newList = [];
                for (let index = 0; index < result.length; index++) {
                    newList.push(ProjectDTO(result[index].Status, result[index].ProjectName, result[index].PageId))
                }
                setIsLoaded(true)
                setActiveItems(newList.filter(item => item.status === "Aktivt"));
            }, 
        );
    }, []); 

    useEffect(() => {
        fetch("http://localhost:5000/people")
        .then(res => res.json())
        .then(
            (result)=>{ 
                const ppl = result.filter(usr => 
                    usr.Email.toLowerCase() === localStorage.getItem("userEmail")
                );
                setPersonId(ppl[0].PersonId);
            },
            (error) => {
                setError(error);
            });
    }, []); 
    
    const handleSubmit = (event) => {
            event.preventDefault();
            axios.post("http://localhost:5000/AddTime", {
                date: date, 
                hours: hours,
                projectid: selectedItem,
                PersonId: personId
            })
            let projectname;
            for (let index = 0; index < activeItems.length; index++) {
                if(activeItems[index].id === selectedItem) {
                    projectname = activeItems[index].projectName
                }
            }
            
            if(Swal.fire({
                className: "swal-popup",
                title: "Följande uppgifter har lagts till i projekt: " + (projectname),
                text: "Datum: " + (date) + " " + ", Antal timmar: " + (hours),
                icon: "success",
                button: "Okej",
            }).then((value) => {
                if(value ){
                    window.location.reload();
                }
            }))
            {};
        }    

        if (!isLoaded) {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div className="spinner-border" role="status"></div></div>
            );
        }
        return (
            <>
            <div className="page-prompt" role="alert">
              <h3>Lägga till tid</h3>
              <h6>Med den här funktionen kan användaren lägg till arbetad tid i det aktuella projektet.</h6>
            </div>
            <div className="form-container">
              <div>
                <form className="card-container-form text-center" onSubmit={handleSubmit}>
                  <div className="col">
                  <h1 className="text-center">Rapportera tid<br/><br/></h1>
                    <label for="Projects" className="form-heading">
                      Projekt
                    </label>
                    <select
                      className="bg-white border border-gray-300 text-black text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={selectedItem}
                      required
                      onChange={handleChange}
                    >
                      <option value="">Välj projekt</option>
                      {activeItems.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.projectName}
                        </option>
                      ))}
                    </select>

                    <div className="relative max-w-sm">
                      <label for="Date" className="form-heading">
                        Datum{" "}
                      </label>
                      <input
                        className="bg-white border border-gray-300 text-black
                                     text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="formInput"
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="DateTime"
                      ></input>
                    </div>

                    <div className="relative max-w-sm">
                      <label for="Hours" className="form-heading">
                        Antal timmar
                      </label>
                      <input
                        className="bg-white border border-gray-300 text-black text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="number"
                        required
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                        placeholder="00,00"
                      ></input>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div className="default-btn">
                      <button type="submit">Lägg till</button>
                    </div>
                  </div>
                </form>
                <br />
                <br />
                <br />
              </div>
            </div>
          </>
        );
}

