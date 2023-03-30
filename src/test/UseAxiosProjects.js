import { useEffect, useState } from "react"
import axios from "axios";

const useFetchProjects = () => {

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const projectUrl = "http://localhost:5000/projects";

  useEffect(()=>{
    const fetchData = async () =>{
      try {
        const {data: response} = await axios.get(projectUrl);
        setData(response);
        }catch (error){
          setError(error);
          console.error(error)
        }
        setLoading(false);
    };
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
  };
};

export default useFetchProjects;
