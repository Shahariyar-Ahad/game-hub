import axios from "axios";
import { useEffect, useState } from "react";

const useGames=() => {
  const [games, setGames] =useState([])
  const [loading, setLoading]=useState(true)
  const [error, setError]=useState(null)

  useEffect(() =>{
    axios('../games.json')
    .then(data =>setGames(data.data))
    .catch(err =>setError(err))
    .finally(()=>setLoading(false))
  },[])
  return{
    games,loading,error
  }
} 

export default useGames



