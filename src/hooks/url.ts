import axios from 'axios';

export const url = 'http://localhost:8080/';

const getToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) throw 'not logged';
    return token;
};

const getTodoLists = async () => {
    const token = await getToken();
    const { data } = await axios.get(url + 'lists', {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    });
};
