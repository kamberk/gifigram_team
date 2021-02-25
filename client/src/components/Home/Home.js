import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
// import FindInPageIcon from '@material-ui/icons/FindInPage';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import TextField from '@material-ui/core/TextField';
import { getPosts } from '../../actions/posts';
import Posts from '../Posts/Posts';
// import Hidden from '@material-ui/core/Hidden';
// import Form from '../Form/Form';
// import useStyles from '../Form/styles';
import ScrollToTop from "react-scroll-to-top";

const Home = () => {
    // const classes = useStyles();

    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    // const [text, setText] = useState('');

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    // useEffect(() => {
    //     dispatch(filterPosts(text))
    // }, [text, dispatch])


    return (
        <Grow in>
            <Container>
                <ScrollToTop smooth color="#9500ff" />
                {/* <Hidden only={['lg', 'md']}>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                </Hidden> */}
                <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={12} >
                        {/* <TextField
                            className={classes.search}
                            id="filled-basic"
                            variant="filled"
                            label="Search posts by user name..."
                            onChange={(e) => setText(e.target.value)}
                            fullWidth
                            InputProps={{
                                className: classes.input,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FindInPageIcon style={{ color: '#fff' }} />
                                    </InputAdornment>
                                ),
                            }}
                        /> */}
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    {/* <Hidden only={['xs', 'sm']}>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                        </Grid>
                    </Hidden> */}
                </Grid>
            </Container>
        </Grow>
    );
};

export default Home;