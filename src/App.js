import { useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Create from './components/Create/Create';
import Edit from './components/Edit/Edit';
import Details from './components/Details/Details';
import Catalog from './components/Catalog/Catalog';
import * as gameService from './services/gameService';


function App() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        gameService.getAll()
            .then(result => {
                setGames(result);
            })
    }, []);

    return (
        <div id="box">
            <Header />

            {/* Main Content */}
            <main id="main-content">

                <Routes>
                    {/*Home Page*/}
                    <Route path="/" element={<Home games={games} />} />
                    {/* Login Page ( Only for Guest users ) */}
                    <Route path="/login" element={<Login />} />
                    {/* Register Page ( Only for Guest users ) */}
                    <Route path="/register" element={<Register />} />
                    {/* Create Page ( Only for logged-in users ) */}
                    <Route path="/create" element={<Create />} />
                    {/* Catalogue */}
                    <Route path="/allgames" element={<Catalog games={games} />} />
                </Routes>
            </main>

            {/* Edit Page ( Only for the creator )*/}
            {/* <Edit /> */}
            {/*Details Page*/}
            {/* <Details /> */}

        </div>

    );
}

export default App;
