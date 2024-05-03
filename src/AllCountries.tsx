import React, { useEffect, useState } from 'react';
import './App.css';
import axios from "axios"
import { Link } from 'react-router-dom';

interface Countries {

    name: {
        common: string,
        official: string
    },
    flags: {
        svg: string
    },
    region: string,
    population: string,
    borders: string[];
}
const regions = [Asia, Africa, Americas, Oceania, Europe, Antarctic]
function AllCountries() {

    const [countriesData, setCountriesData] = useState<Countries[]>([])
    const [searchCountry, setSearchCountry] = useState<string>("")
    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all")
            .then(response => {
                setCountriesData(response.data)
            })
    }, [])

     function getCountry() {
        axios.get(`https://restcountries.com/v3.1/name/${searchCountry}`)
            .then(response => {
                setCountriesData(response.data)
            })
    }
    const handleForm = (event: any) => {
        event.preventDefault();
        getCountry();
    }

    return (
        <div>
            <form onSubmit={handleForm}>
                <input type='text'
                    value={searchCountry}
                    onChange={(event) => setSearchCountry(event.target.value)}
                    name="search"
                    id='search'
                    placeholder='Search Country' />
            </form>
            <div>
                {countriesData && countriesData.map((country) => (
                    <Link to={`/${country.name.common}`} key={country.name.official}>
                        <div>
                            <img width={240} src={country.flags.svg} alt='flag' />
                            <p>{country.name.official}</p>
                            <p>{country.region}</p>
                            <p>{country.population.toLocaleString()}</p>
                            <div> Borders:{country.borders && country.borders.map((border) => {
                                return <div>{border}
                                </div>
                            })}</div>
                        </div>
                    </Link>
                ))}
              
            </div>
        </div>
    );
}

export default AllCountries;
