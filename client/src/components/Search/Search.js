import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterPosts, getPosts } from '../../actions/posts';
import { Grid, Grow, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Posts from '../Posts/Posts';

const Search = () => {
    const dispatch = useDispatch();

    const [currentId, setCurrentId] = useState();
    const [text, setText] = useState('');

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    useEffect(() => {
        dispatch(filterPosts(text))
    }, [text, dispatch])



    return (
        <Grow in>
            <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={12} >
                    <TextField
                        id="filled-basic"
                        variant="outlined"
                        label="Search posts by user name..."
                        onChange={(e) => setText(e.target.value)}
                        fullWidth
                    />
                    {text === "" ? <Typography style={{ color: '#002e36', fontSize: '20px', textAlign: 'center', fontFamily: 'Raleway', marginTop: '10%' }}>Search for posts...</Typography> : <Posts setCurrentId={setCurrentId} />}

                </Grid>
            </Grid>
        </Grow>
    )
}

export default Search
