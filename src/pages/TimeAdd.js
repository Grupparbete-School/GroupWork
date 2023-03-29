import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import ProjectDTO from './ProjectDTO';
import axios from 'axios';   

export default function TimeForm() {
    const [activeItems, setActiveItems] = useState([ProjectDTO("0")]);
    const [selectedItem, setSelectedItem] = useState(activeItems[0]);
    const [personId, setPersonId] = useState("");
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
                    newList.push(ProjectDTO(result[index].Status, result[index].ProjectName, result[index].Id))
                }
                setActiveItems(newList.filter(item => item.status === "Active"));
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
        );
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
            
            alert(`Följande uppgifter har lagts till i projekt ${(projectname)}: 

            Datum:  ${date} 
            Antal timmar: ${hours}`);
        }

        return (
            <>
            <form className="Form-container" onSubmit={handleSubmit}> 
                <div className="relative max-w-sm">
                    <label for="Projects">Projekt</label>
                    <select className="Form-input" value={selectedItem} required
                    onChange={handleChange}> 
                    <option value="">Välj projekt</option>
                    {activeItems.map((item, index) => 
                    ( <option
                        key={index} 
                        value={item.id}> 
                        {item.projectName} 
                    </option> ))} 
                    </select>
                </div>

                <div className="relative max-w-sm">
                    <label for="Date">Datum
                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            id="formInput"
                            type="date" required 
                            value={date} 
                            onChange={(e) => setDate(e.target.value)} 
                            placeholder="DateTime">
                        </input>
                    </label>
                </div>

                <div className="relative max-w-sm">
                    <label for="Hours">Antal timmar
                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number" required 
                            value={hours} 
                            onChange={(e) => setHours(e.target.value)} 
                            placeholder="00,00">
                        </input>
                    </label>
                </div>

                <div className="flex items-center justify-between">
                <button
                className="Form-button" 
                id="Formbutton"
                type="submit">
                    Lägg till</button>
                </div>
            </form>
            </>
        )
}

