import AllCountries from './AllCountries';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IndividualCountry from './IndividualCountry';
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllCountries />}></Route>
      <Route path='/:name' element={<IndividualCountry />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
