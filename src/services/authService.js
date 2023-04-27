import * as request from "./utl/requester";

const url = 'http://localhost:3031';

export const login = (email, password) =>
    request.post(`${url}/users/login`, { email, password });
