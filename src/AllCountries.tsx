import React, { useEffect, useState } from 'react';
import './App.css';
import axios from "axios"
import { Link } from 'react-router-dom';
import { Select, Space } from 'antd';
import Search from 'antd/es/transfer/search';


const { Option } = Select;
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

// Asia: string,
// Africa: string,
// Americas: string,
// Oceania: string,
// Europe: string,
// Antarctic: string
// }

interface Regions {
    regionsArray: string
}
const regionsArray = ["Asia", "Africa", "Americas", "Oceania", "Europe", "Antarctic"]

function AllCountries() {


    // const [region, setRegion] = useState<Regions>("")
    const [countriesData, setCountriesData] = useState<Countries[]>([])
    const [searchCountry, setSearchCountry] = useState<string>("")
    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all")
            .then(response => {
                setCountriesData(response.data)
            })
    }, [])

    // Search by country
    function getCountry() {
        axios.get(`https://restcountries.com/v3.1/name/${searchCountry}`)
            .then(response => {
                setCountriesData(response.data)
            })
    }
    // Filter by Region
    // const handleRegion = () => {
    //     axios.get("https://restcountries.com/v3.1/region/{region}")
    //         // axios.get("https://restcountries.com/v3.1/region/europe")
    //         .then(response => {
    //             setCountriesData(response.data)
    //             console.log(response.data)
    //         })
    // }

    const handleForm = (event: any) => {
        event.preventDefault();
        getCountry();
    }

    return (
        <div className='main-page-container'>
            <div className="form-div">
                <form className="form" onSubmit={handleForm}>
                    <input type='text'
                        value={searchCountry}
                        onChange={(event) => setSearchCountry(event.target.value)}
                        name="search"
                        id='search'
                        placeholder="Search for a country by it's name"/>
                </form>
                {/* <Space wrap> */}
                    <Select  className="mt-6"
                        // value={region}
                        style={{ width: 210 }}
                    // onChange={(newRegion) => handleRegion()}

                    >

                        <Option key="All" value="">
                            All Regions
                        </Option>
                        <Option key="Asia" value="Asia"> Asia</Option>
                        <Option key="Africa" value="Africa"> Africa</Option>
                        <Option key="Americas" value="Americas"> Americas</Option>
                        <Option key="Antarctic" value="Antarctic"> Antarctic</Option>
                        <Option key="Europe" value="Europe"> Europe</Option>
                        <Option key="Oceania" value='Oceania'>Oceania</Option>

                    </Select>
                {/* </Space> */}
            </div>
            <div className='countries-data-div'>
                {countriesData && countriesData.map((country) => (
                    <Link to={`/${country.name.common}`} key={country.name.official}>
                        <div className='card'>
                            <img width={240} src={country.flags.svg} alt='flag' />
                            <p>Name: {country.name.official}</p>
                            <p>Region: {country.region}</p>
                            <p>Population: {country.population.toLocaleString()}</p>
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
