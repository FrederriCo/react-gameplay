import { createContext, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as gameService from '../services/gameService'

export const GameContext = createContext();
const gameReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_GAMES':
            return action.payload.map(x => ({ ...x, comments: [] }));
        case 'ADD_GAME':
            return [...state, action.payload];
        case 'FETCH_GAME_DETAILS':
        case 'EDIT_GAME':
            return state.map(x => x._id === action.gameId ? action.payload : x);
        case 'ADD_COMMENT':
            return state.map(x => x._id === action.gameId ? { ...x, comments: [...x.comments, action.payload] } : x);
            case 'REMOVE_GAME':
            return state.filter(x => x._id !== action.gameId);
        default:
            return state;
    }
};

export const GameProvider = ({ children }) => {

    const navigate = useNavigate();
    const [games, dispatcher] = useReducer(gameReducer, []);

    useEffect(() => {
        gameService.getAll()
            .then(result => {
                const action = {
                    type: 'ADD_GAMES',
                    payload: result
                }
                dispatcher(action);
            })
    }, []);

    const selectGame = (gameId) => {
        return games.find(x => x._id === gameId) || {};
    }

    const fetchGameDetails = (gameId, gameData) => {
        dispatcher({
            type: 'FETCH_GAME_DETAILS',
            payload: gameData,
            gameId
        });
    };

    const addComment = (gameId, comment) => {
        dispatcher({
            type: 'ADD_COMMENT',
            payload: comment,
            gameId
        });


        /*   setGames(state => { 
            const game = state.find(x => x._id == gameId); 
            console.log(game); 
            const comments = game.comments || []; 
            comments.push(comment); 

            return [ 
                ...state.filter(x => x._id !== gameId), 
                { ...game, comments } 
            ] 
        });  */
    };

    const addGame = (gameData) => {
        dispatcher({
            type: 'ADD_GAME',
            payload: gameData
        })

        navigate('/catalog');
    };

    const gameEdit = (gameId, gameData) => {
        // setGames(state => state.map(x => x._id === gameId ? gameData : x));
        dispatcher({
            type: 'EDIT_GAME',
            payload: gameData,
            gameId,
        });
    };

    const removeGame = (gameId) => {
        dispatcher({
            type: 'REMOVE_GAME',
            gameId
        });
    };


    return (
        <GameContext.Provider value={{ games, addGame, gameEdit, addComment, fetchGameDetails, selectGame, removeGame }}>
            {children}
        </GameContext.Provider>
    );
};