const url = 'http://localhost:3031';

export const getAll = () => {
   return fetch(`${url}/data/games`)
    .then(res => res.json())    
};