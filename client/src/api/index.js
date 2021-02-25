
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000/' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const fetchPosts = () => API.get('/posts');

const user = JSON.parse(localStorage.getItem('profile'));

export const fetchUserPosts = async () => API.get('/posts/getUserPosts', { data: { name: user.result.name } });

// export const activateUser = async (token) => API.post(`/user/email-activate/${token}`);

export const createPost = (newPost) => API.post('/posts', newPost);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);