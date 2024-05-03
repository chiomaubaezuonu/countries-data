import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

interface CountryData {
    name: {
        common: string,
        official: string
    },
    flags: {
        svg: string
    },
    capital: string[],
    region: string,
    population: string,
    border: string[],
    subregion: string[]
}

const IndividualCountry = () => {
    const [singleCountry, setSingleCountry] = useState<CountryData[]>([])
    const { name } = useParams();

    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/name/${name}`)
            .then(response => {
                setSingleCountry(response.data)
            })
    }, [name])


    return (
        <div>
            {
                singleCountry && singleCountry.map((eachCountry) => (
                    <div key={eachCountry.name.common}>
                        <img width={240} src={eachCountry.flags.svg} alt='flag' />
                        <p>{eachCountry.name.official}</p>
                        <p>Capital: {eachCountry.capital[0]}</p>
                        <p>Population: {eachCountry.population.toLocaleString()}</p>
                        <p> Region: {eachCountry.region}</p>
                        <p>Subregion: {eachCountry.subregion}</p>
                    </div>

                ))
            }
        </div>
    )
}

export default IndividualCountry