import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';
import Swal from 'sweetalert2';

export const signin = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });

        router.push('/');
    } catch (error) {
        Swal.fire(
            'Activation needed!',
            'Check your email and activate your account!',
            'question'
        )
    }
};

export const signup = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data });

        router.push('/redirect');
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Wrong entered data! Change email and try again!'
        })
    }
};