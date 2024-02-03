import axios from "axios";
import { useEffect, useState } from "react";

interface IData{
  id: string;
  url: string;
  width?: number;
  height?: number;
}
export function useCatsData() {
  const [isCats,setCats] = useState<IData[]>([])
  useEffect(() => {
    axios.get('https://api.thecatapi.com/v1/images/search?limit=25&breed_ids=beng&api_key=live_7VEoOC8f28z7wYBiA1vEi9skKg5pACSLW7SY87C7TNvX4kJe3kh40jwlkUXOcuvo', {})
      .then(response => {
        setCats(response.data)
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  },[])

  return isCats;
}
