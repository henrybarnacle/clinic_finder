import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import mapboxgl from 'mapbox-gl'; 
import { mapboxglAccessToken } from './config/keys';
import ClinicDetail from './components/ClinicDetail';
import ClinicSearch from './components/ClinicSearch';
import Header from './components/Header';

mapboxgl.accessToken = mapboxglAccessToken;

const App = () => {

    return (
        <div className="ui container">   
            <BrowserRouter>
                <div>
                    <Header/>
                    <Routes>
                      <Route path="/" element={<ClinicSearch />}></Route>
                      <Route path="/detail" element={<ClinicDetail/>}></Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
