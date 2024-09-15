import { useEffect, useState } from "react";

function useNames(){
    const [symbols , setSymbols] = useState({});
    useEffect(()=>{
        const callback = async() =>{
            const api = await fetch("/json/allNames.json");
            const result = await api.json();
            // console.log(result)
            setSymbols(result);

        }
        callback();
    } , [])
    return symbols;
}

export default useNames
