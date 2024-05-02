import React, { useEffect, useState } from 'react';
import './App.css';
import axios from "axios"

interface Countries {

  name: {
    common: string,
    official: string
  },
  region: string,
  population: string
}
function App() {

  const [countriesData, setCountriesData] = useState<Countries[]>([])

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountriesData(response.data)
      })
  })

  return (
    <div className="App">
      lkjihugyt
      {countriesData && countriesData.map((country) => (
        <div key={country.name.official}>
          <p>{country.name.official}</p>
          <p>{country.region}</p>
          <p>{country.population.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
