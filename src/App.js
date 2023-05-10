import { lazy, Suspense } from "react";
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
//import Register from './components/Register/Register';
import Create from './components/Create/Create';
import Edit from './components/Edit/Edit';
import Details from './components/Details/Details';
import Catalog from './components/Catalog/Catalog';
import { AuthProvider } from './context/AuthContext';
import { GameProvider } from './context/GameContext';
import PrivateRoute from './services/utl/PrivateRoute';
import PrivateGuard from "./services/utl/PrivateGuard";
import GameOwner from "./services/utl/GameOwner";


const Register = lazy(() => import('./components/Register/Register'));

function App() {

    return (
        <AuthProvider>
            <div id="box">
                <Header />

                {/* Main Content */}
                <GameProvider>
                    <main id="main-content">
                        <Routes>
                            {/*Home Page*/}
                            <Route path="/" element={<Home />} />
                            {/* Login Page ( Only for Guest users ) */}
                            <Route path="/login" element={<Login />} />
                            {/* Register Page ( Only for Guest users ) */}
                            <Route path="/register" element={
                                <Suspense fallback={<span>Loading....</span>}>
                                    <Register />
                                </Suspense>
                            } />
                            {/* Create Page ( Only for logged-in users ) */}
                            <Route path="/create" element={(
                                <PrivateRoute><Create /></PrivateRoute>
                            )} />
                            {/* Edit Page ( Only for the creator )*/}
                            {/* Catalogue */}
                            <Route path="/catalog" element={<Catalog />} />
                            {/* Logout */}
                            {/*Details Page*/}
                            <Route element={<GameOwner />}>
                                <Route path="games/:gameId/edit" element={<Edit />} />
                            </Route>
                            <Route path="/catalog/:gameId" element={<Details />} />
                            <Route element={<PrivateGuard />}>
                                <Route path="/logout" element={<Logout />} />
                            </Route>
                        </Routes>
                    </main>
                </GameProvider>

            </div>
        </AuthProvider>
    );
}

export default App;
