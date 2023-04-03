import React, { createContext, useEffect, useState } from "react";
export const PeoplesContext = createContext([]);

const ProfileImage = () => {
  
  const peopleUrl = "http://localhost:5000/people";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [peoples, setPeoples] = useState([]);

  useEffect(() => {
    fetch(peopleUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          setLoading(true);
          setPeoples(result);
        },
        (error) => {
          setLoading(true);
          setError(error);
        }
      );
  }, []);

  const loggedInUser = localStorage.getItem("userEmail"); 
  
  return (
    <div>
      {peoples.map((person) => {
        if (person.Email === loggedInUser) {
          return (
            <div key={person.PersonId}>
              {/* <h2>{person.Name}</h2> */}
              {person.ProfileImage && (
                <img
                  src={person.ProfileImage.url}
                  alt={`${person.Name} Profile Image`}
                />
              )}
            </div>
          );
        } else {
          return null; // skip this person's data
        }
      })}
    </div>
  );
};

export default ProfileImage;
