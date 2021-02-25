import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import MyPosts from '../Posts/MyPosts';
import axios from 'axios';
import { Ripple } from 'react-spinners-css';

const Profile = () => {

    const [userPosts, setUserPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetch = async () => {
        try {
            setLoading(true);
            const user = JSON.parse(localStorage.getItem('profile'));
            const name = user.result?.name;
            let posts = await axios.request({
                method: 'get',
                url: 'http://localhost:3000/posts/getUserPosts/' + name,

            })
            setUserPosts(posts?.data);
            setLoading(false);
            console.log(posts?.data);
        } catch (err) {
            setLoading(false);
            setError('Could not fetch user posts...')
            console.log(err)
        }
    };

    useEffect(() => {
        fetch();
    }, []);
    return error ? <h1>{error}</h1> : loading ? <div><Ripple color="#477bff" style={{ marginLeft: '45%', marginTop: '15%' }} size={200} /></div> : (
        <Grow in>
            <Container>
                <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <MyPosts currentUserPosts={userPosts} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Profile
