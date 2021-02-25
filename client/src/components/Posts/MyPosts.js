import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import MyPost from './Post/UserPost';
import useStyles from './styles';
import { Ripple } from 'react-spinners-css';

const MyPosts = ({ currentUserPosts }) => {
    const classes = useStyles();

    console.log(currentUserPosts);

    return !currentUserPosts ? <Ripple color="#477bff" style={{ marginLeft: '45%', marginTop: '15%' }} size={50} /> : currentUserPosts.length === 0 ? <Typography className={classes.eror}>No posts to show...</Typography> : (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {currentUserPosts.map((post) => (
                <Grid key={post._id} item xs={12} sm={6} md={4}>
                    <MyPost post={post} />
                </Grid>
            ))}
        </Grid>
    )
}

export default MyPosts;