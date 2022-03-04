import { useState, useEffect } from "react";






function GetFetch(url){

    const [section, setSection] = useState([]);

    useEffect(()=>{

        let abort = new AbortController();
        fetch("http://localhost:3001/sections",{signal : abort.signal})
        .then(res => res.json())
        .then(data => setSection(data) );

        console.log('GetSection: ', section);
       return function () {
        return abort.abort();
     }
    },[url]);
    
    return section ;
}

export default GetFetch;