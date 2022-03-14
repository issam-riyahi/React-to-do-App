import { useState, useEffect } from "react";






function GetFetch(url){

    const [section, setSection] = useState([]);

    useEffect(()=>{

        let abort = new AbortController();
        fetch("http://localhost:3001/sections",{signal : abort.signal})
        .then(res => {
            
            if(res.ok){
              return  res.json() ;
            }
            abort.abort();
            
        
        })
        .then(data => setSection(data) )
        .catch(error => {
            console.log(error)
        })
        // console.log('GetSection: ', section);
       return function () {
             abort.abort();
       }
    },[url]);
    
    return section ;
}

export default GetFetch;