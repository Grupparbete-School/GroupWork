import React, { useEffect, useState } from "react";

const ProfileImage = () => {
  const peopleUrl = "http://localhost:5000/people";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [peoples, setPeoples] = useState([]);
  const [profileImage, setProfileImage] = useState("");

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
  const loggedInUserId = localStorage.getItem("userEmail"); // replace with actual logged-in user ID
  return (
    <div>
      {peoples.map((person) => {
        if (person.Email === loggedInUserId) {
          return (
            <div key={person.PersonId}>
              <h2>{person.Name}</h2>
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
