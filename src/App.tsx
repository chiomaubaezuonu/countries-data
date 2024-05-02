import React, { useEffect, useState } from 'react';
import './App.css';
import axios from "axios"

interface Countries {

  name: {
    common: string,
    official: string
  },
  flags: {
    svg: string
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
      {countriesData && countriesData.map((country) => (
        <div key={country.name.official}>
          <img width={240} src={country.flags.svg} alt='flag' />
          <p>{country.name.official}</p>
          <p>{country.region}</p>
          <p>{country.population.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
