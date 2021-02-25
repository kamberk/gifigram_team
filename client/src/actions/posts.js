import { FETCH_ALL, CREATE, UPDATE, DELETE, FILTER_ALL } from '../constants/actionTypes';
import * as api from '../api';
import swal from 'sweetalert';
import Swal from 'sweetalert2';


export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({
            type: FETCH_ALL, payload: data.sort(function compare(a, b) {
                var dateA = new Date(a.createdAt);
                var dateB = new Date(b.createdAt);
                return dateB - dateA;
            })
        })
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! Check your connection and try again!'
        })
    }
}

export const filterPosts = (text) => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({
            type: FETCH_ALL, payload: data.sort(function compare(a, b) {
                var dateA = new Date(a.createdAt);
                var dateB = new Date(b.createdAt);
                return dateB - dateA;
            })
        })
        dispatch({ type: FILTER_ALL, payload: text })
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! Please try again later!'
        })
    }
}

export const getUserPosts = () => async (dispatch) => {

    const user = JSON.parse(localStorage.getItem('profile'));
    const userName = user?.result?.name;

    try {
        const { data } = await api.fetchUserPosts(userName);
        console.log(data);
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
        })
    }
}


export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({ type: CREATE, payload: data });
        swal("Published!", "The post was successfully published!", "success");
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! Make sure you selected .gif file smaller than 70Kb!'
        })
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({ type: UPDATE, payload: data });
        swal("Updated!", "The post was updated successfully!", "success");
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! Check post data and try again!'
        })
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id });
        swal("Deleted!", "The post was successfully deleted!", "success");
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
        })
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! Make sure post is still published'
        })
    }
}

