import * as request from "./utl/requester";

const url = 'http://localhost:3031/data/games';

export const getAll = () => request.get(url);

export const getOneGame = (gameId) => request.get(`${url}/${gameId}`);

export const create = (gameData) => request.post(url, gameData);

export const edit = (gameId, gameData) => request.put(`${url}/${gameId}`, gameData);

export const remove = (gameId) => request.del(`${url}/${gameId}`);