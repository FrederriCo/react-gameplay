import * as request from "./utl/requester";

const url = 'http://localhost:3031/data/comments';

export const create = (gameId, comment) =>
    request.post(url, { gameId, text: comment });

export const getByGameId = (gameId) => {
    const relations = encodeURIComponent('user=_ownerId:users');
    const search = encodeURIComponent(`gameId="${gameId}"`);

    return request.get(`${url}?where=${search}&load=${relations}`);
}
