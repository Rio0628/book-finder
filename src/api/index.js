import axios from 'axios';

export const insertBook = payload => axios.post( `api/book`, payload );
export const getAllBooks = () => axios.get(`api/book`);
export const updateBookById = (id, payload) => axios.put(`api/book/${id}`, payload);
export const deleteBookById = id => axios.delete(`api/book/${id}`);
export const getBookById = id => axios.get(`api/book/${id}`);

const apis = {
    insertBook,
    getAllBooks,
    updateBookById,
    deleteBookById,
    getBookById,
}

export default apis;