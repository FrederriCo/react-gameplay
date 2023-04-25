import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';
import uniqid from 'uniqid';

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
    const navigate = useNavigate();

    const addComment = (gameId, comment) => {
        setGames(state => {
            const game = state.find(x => x._id == gameId);
            console.log(game);
            const comments = game.comments || [];
            comments.push(comment);

            return [
                ...state.filter(x => x._id !== gameId),
                {...game, comments}
            ]
        });
    };

    const addGameHandler = (gameData) => {
        setGames(state => [
            ...state,
            {
                ...gameData,
                _id: uniqid(),
            },
        ]);

        navigate('/catalog');
    };

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
                    <Route path="/create" element={<Create addGameHandler={addGameHandler} />} />
                    {/* Catalogue */}
                    <Route path="/catalog" element={<Catalog games={games} />} />
                     {/*Details Page*/}
                     <Route path="/catalog/:gameId" element={<Details games={games} addComment={addComment} />} />
                </Routes>
            </main>

            {/* Edit Page ( Only for the creator )*/}
            {/* <Edit /> */}           

        </div>

    );
}

export default App;
