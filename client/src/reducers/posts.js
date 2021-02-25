import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_USER_POSTS, FILTER_ALL } from '../constants/actionTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (posts = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case FILTER_ALL:
            return posts.filter(elem => action.payload !== '' ? elem.name.toLowerCase().includes(action.payload.toLowerCase()) : elem);
        case FETCH_USER_POSTS:
            return action.payload;
        case LIKE:
            return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
        case CREATE:
            return [...posts, action.payload];
        case UPDATE:
            return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
        case DELETE:
            return posts.filter((post) => post._id !== action.payload);
        default:
            return posts;
    }
};