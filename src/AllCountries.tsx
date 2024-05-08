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
    subregion: string,
    borders: string[]
}



interface Regions {
    name: string
}
 const regionsArray = ["Asia", "Africa", "Americas", "Oceania", "Europe", "Antarctic"]

function AllCountries() {


    const [region, setRegion] = useState<string>("")
    const [countriesData, setCountriesData] = useState<Countries[]>([])
    const [searchCountry, setSearchCountry] = useState([])
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

    //    country search
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
                        // onChange={(event) => setSearchCountry(event.target.value)}
                        name="search"
                        id='search'
                        placeholder="Search for a country by it's name" />
                </form>
                {/* <Space wrap> */}
                <Select className="mt-6"

                    value={region}
                    style={{ width: 210 }}
                    onChange={(newRegion:any) => {
                        setRegion(newRegion);
                        if(newRegion){
                            setCountriesData(countriesData.filter((item) =>{
                                return newRegion === item.region
                            }))
                        }
                    }}
                >

                    <Option key="All Regions" value="">
                        Filter by Regions
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
                            <img src={country.flags.svg} alt='flag' />
                            <div className='country-data-div'>
                                <h2 className='country-name'>{country.name.common}</h2>
                                <p className='country-data'>Population: {country.population.toLocaleString()}</p>
                                <p className='country-data'>Region: {country.region}</p>
                                <p className='country-data'>Subregion: {country.subregion}</p>
                            </div>
                        </div>
                    </Link>
                ))}

            </div>
        </div>
    );
}

export default AllCountries;




