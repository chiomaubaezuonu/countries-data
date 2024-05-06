import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./App.css"

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
    borders: string[],
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
                    <div className='individual-country-card' key={eachCountry.name.common}>
                        <img className='flag' width={100} src={eachCountry.flags.svg} alt='flag' />
                        <div className="individual-country-data-div">
                            <div className="individual-country-data">
                                <h2 className='individual-country-name'>{eachCountry.name.official}</h2>
                                <p>Capital: {eachCountry.capital[0]}</p>
                                <p>Population: {eachCountry.population.toLocaleString()}</p>
                                <p> Region: {eachCountry.region}</p>
                                <p>Subregion: {eachCountry.subregion}</p>
                            </div>
                            <div className='borders-div'>
                                <h3>Borders: </h3>
                                <div className='country-border'>
                                    {eachCountry.borders && eachCountry.borders.map((border) => {
                                        return <p>{border}</p>
                                    })}</div>
                            </div>
                            <button className='back-btn'>&larr; Back</button>
                        </div>
                    </div>

                ))
            }
        </div>
    )
}

export default IndividualCountry