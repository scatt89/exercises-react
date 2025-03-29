import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import Home from './home/Home.jsx';
import CountryAndCapital from './countryAndCapital/index.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Home/> }/>
                <Route path='/country-and-capital' element={ <CountryAndCapital/> }/>
            </Routes>
        </BrowserRouter>
    </StrictMode>
)
