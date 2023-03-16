import {useState, useEffect} from 'react'
export default function FetchPeople(){
    const [error, setError] = useState(null)
    const[isloaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    useEffect(()=>{
        fetch("http://localhost:5000")
        .then(res => res.json())
        .then(
            (result)=>{
                setIsLoaded(true)
                setItems(result)
            },
            (error) =>{
                setIsLoaded(true)
                setError(error)
            }
        );
    },[]);
    if(error){
        return <div>Error: {error.message}</div> }
    else if(!isloaded){
        return <div>Loading ...</div> }
    else{
        return(
            <div className=''>                
                <div className='grid grid-cols-3 gap-3'>                   
                    {items.map((item, index)=>                   
                    <div key={index} className="bg-red-400">                    
                    {item.Name}
                    <div></div>                    
                    <div></div>                   
                    </div>                   
                    )}
                </div>            
            </div>        
        );
    }
}