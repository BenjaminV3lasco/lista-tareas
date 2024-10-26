import { useEffect, useState } from "react";
import { URL } from "../consts/consts";

export const getEpics = (projectId) =>{
    const [epics, setEpics] = useState ({
        data:[],
        loading: true
    }); 

    const fetchEpicsId = async () =>{
        try{
            const url = `${URL}/projects/${projectId}/epics`
            const response = await fetch(url, {
                method: "GET", 
                headers: {
                    "Content-Type": "application/json",
                    auth: localStorage.getItem("token"),
                  }
            });
    
            const {data} = await response.json();
        
            setEpics({
                data: data,
                loading: false,
              });
        }catch (error){
            console.log(error)
		setEpics({
			data: null,
			loading: false,
		  });
        }
    }
    useEffect(()=>{
        fetchEpicsId()
      },[])
     
    return epics;
}